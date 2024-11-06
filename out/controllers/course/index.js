import { Chapter } from '../../models/Chapter.js';
import { Course } from '../../models/Course.js';
import { Detail } from '../../models/Detail.js';
import { Lesson } from '../../models/Lesson.js';
import { Maintype } from '../../models/Maintype.js';
import { Section } from '../../models/Section.js';
import { User } from '../../models/User.js';
import _ from 'lodash';
import { Tag } from '../../models/Tag.js';
import { quickSort } from '../../utils/quickSort.js';

const getCourse = async (request, reply) => {
    const courseId = request.params.course_id;
    const course = await Course.findById(courseId);
    if (!course) {
        await reply.code(400).send('not found course');
        return;
    }
    const handleMaintype = async () => {
        const detail = await Detail.findById(course?.detail_id, { _id: 1, section_id: 1 });
        const [section, tag] = await Promise.all([
            Section.findById(detail.section_id, { _id: 1, maintype_id: 1 }),
            Tag.findById(detail.tag_id, { _id: 1, tag_name: 1 }),
        ]);
        const maintype = await Maintype.findById(section?.maintype_id, { _id: 1, type_name: 1 });
        return {
            maintype_id: maintype._id,
            maintype_name: maintype.type_name,
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
        const data = await Promise.all(chapters.map(async (chapter) => {
            const lessons = await Lesson.find({ chapter_id: chapter._id }, { _id: 1, lesson_name: 1, order: 1, duration: 1 });
            return {
                _id: chapter._id,
                chapter_name: chapter.chapter_name,
                duration: _.sum(lessons.map((x) => x.duration)),
                order: chapter.order,
                lessons: quickSort(lessons.map((lesson) => {
                    return {
                        _id: lesson._id,
                        lesson_name: lesson.lesson_name,
                        duration: lesson.duration,
                        order: lesson.order,
                    };
                }), (a, b) => a.order - b.order),
            };
        }));
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

export { getCourse };
