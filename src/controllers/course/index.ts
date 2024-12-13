import { FastifyReply, FastifyRequest } from 'fastify';
import { Chapter } from '~models/Chapter';
import { Course } from '~models/Course';
import { Detail } from '~models/Detail';
import { Lesson } from '~models/Lesson';
import { Maintype } from '~models/Maintype';
import { Section } from '~models/Section';
import { User } from '~models/User';
import _ from 'lodash';
import { Tag } from '~models/Tag';
import { quickSort } from '~utils/quickSort';
import { PipelineStage } from 'mongoose';
export const getCourse = async (request: FastifyRequest<{ Params: { course_id: string } }>, reply: FastifyReply) => {
  const courseId = request.params.course_id;

  const course = await Course.findById(courseId);
  if (!course) {
    await reply.code(400).send('not found course');
    return;
  }

  const handleMaintype = async () => {
    const detail = await Detail.findById(course?.detail_id, { _id: 1, section_id: 1 });
    const [section, tag] = await Promise.all([
      Section.findById(detail!.section_id, { _id: 1, maintype_id: 1 }),
      Tag.findById(detail!.tag_id, { _id: 1, tag_name: 1 }),
    ]);
    const maintype = await Maintype.findById(section?.maintype_id, { _id: 1, type_name: 1 });

    return {
      maintype_id: maintype!._id,
      maintype_name: maintype!.type_name,
      tag_id: tag?._id,
      tag_name: tag?.tag_name,
    };
  };

  const handleAuthor = async () => {
    const user = await User.findById(course.author_id, { _id: 1, fullname: 1 });
    return {
      author_id: course.author_id,
      fullname: user?.fullname,
    };
  };

  const handleStep = async () => {
    const chapters = await Chapter.find({ course_id: course._id }, { _id: 1, chapter_name: 1, order: 1 });
    const data = await Promise.all(
      chapters.map(async (chapter) => {
        const lessons = await Lesson.find(
          { chapter_id: chapter._id },
          { _id: 1, lesson_name: 1, order: 1, duration: 1 },
        );
        return {
          _id: chapter._id,
          chapter_name: chapter.chapter_name,
          duration: _.sum(lessons.map((x) => x.duration)),
          order: chapter.order,
          lessons: quickSort(
            lessons.map((lesson) => {
              return {
                _id: lesson._id,
                lesson_name: lesson.lesson_name,
                duration: lesson.duration,
                order: lesson.order,
              };
            }),
            (a, b) => a.order - b.order,
          ),
        };
      }),
    );
    return {
      chapters: quickSort(data, (a, b) => a.order - b.order),
      duration: _.sum(data.map((x) => x.order)),
    };
  };
  const [steps, maintype, author] = await Promise.all([handleStep(), handleMaintype(), handleAuthor()]);
  const result = {
    ...steps,
    ...maintype,
    ...author,
    ...course.toObject(),
    course_img: `public/course/${courseId}/course_img.jpeg`,
  };
  await reply.code(200).send(result);
};

export const getCoursesOfMaintype = async (request, reply) => {
  const courseId = request.query.course_id;
  const take = request.query.take;
  const random = request.query.random;
  const course = await Course.findById(courseId, { _id: 1, detail_id: 1 });
  const detail = await Detail.findById(course?.detail_id, { _id: 1, section_id: 1 });
  const section = await Section.findById(detail?.section_id, { _id: 1, maintype_id: 1 });
  const maintype = await Maintype.findById(section?.maintype_id, { _id: 1 });
  const sections = await Section.find({ maintype_id: maintype?._id }, { _id: 1 });
  const details = await Detail.find({ section_id: { $in: sections.map((x) => x._id) } }, { _id: 1 });
  const courses = await Course.aggregate(
    [
      random ? { $sample: { size: parseInt(take, 10) } } : undefined,
      take ? { $limit: parseInt(take, 10) } : undefined,
      { $match: { detail_id: { $in: details.map((x) => x._id) } } },
      { $project: { _id: 1 } },
    ].filter(Boolean) as PipelineStage[],
  );
  await reply.code(200).send(courses);
};

export const allCourses = async (request, reply) => {
  const courseLevel = request.query.course_level;
  const courses = await Course.find(removeUndefinedProps({ course_level: courseLevel || undefined }), { _id: 1 });
  await reply.code(200).send(courses);
};
export const randomCourses = async (request, reply) => {
  const courses = await Course.aggregate([{ $sample: { size: 10 } }, { $limit: 10 }, { $project: { _id: 1 } }]).exec();
  await reply.code(200).send(courses);
};

function removeUndefinedProps(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
      delete obj[prop];
    }
  }
  return obj;
}
