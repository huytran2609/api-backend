import { Section } from '~models/Section';
import { Detail } from '~models/Detail';
import { Course } from '~models/Course';
import { removeUndefinedProps } from '~utils/removeUndefinedProps';

export const searchCourses = async (request, reply) => {
  const search = request.body.search;
  const courseLanguage = request.body.course_language;
  const courseLevel = request.body.course_level;
  const maintypeId = request.body.maintype_id;
  const sections = await Section.find({ maintype_id: maintypeId }, { _id: 1 });
  const details = await Detail.find({ section_id: { $in: sections.map((x) => x._id) } }, { _id: 1 });
  const courses = await Course.find(
    removeUndefinedProps({
      course_name: search ? { $regex: search, $options: 'i' } : undefined,
      course_language: courseLanguage || undefined,
      course_level: courseLevel || undefined,
      detail_id: details?.length ? { $in: details.map((x) => x._id.toString()) } : undefined,
    }),
    {
      _id: 1,
    },
  );
  await reply.code(200).send(courses);
};
