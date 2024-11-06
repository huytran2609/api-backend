import { FastifyReply, FastifyRequest } from 'fastify';
import { Course } from '~models/Course';
import { Detail } from '~models/Detail';
import { Maintype } from '~models/Maintype';
import { Path } from '~models/Path';
import { Section } from '~models/Section';
import { Tag } from '~models/Tag';
import { User } from '~models/User';
import { quickSort } from '~utils/quickSort';

export const myRoadmap = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user!;
  const userData = await User.findById(user._id);
  if (!userData?.recommend?.length) {
    await reply.code(400).send('you must be enter skill to predict');
    return;
  }
  const data: {
    maintype_name: string | undefined;
    maintype_id: string | undefined;
    percent: number | undefined;
    sections: {
      section_id: string;
      section_name: string;
      order: number;
      details: {
        detail_id: string;
        detail_name: string;
        is_important: boolean;
        is_completed: boolean;
      }[];
    }[];
  } = {
    maintype_name: undefined,
    maintype_id: undefined,
    percent: undefined,
    sections: [],
  };
  const [maintypeData, pathData] = await Promise.all([
    Maintype.findById(userData?.recommend?.at(0)?.maintype),
    Path.findOne({ user_id: user._id }).then((success) => success),
  ]);
  const completedData = pathData!.is_completed;
  const importantData = pathData!.is_important;
  data.maintype_id = maintypeData!._id;
  data.maintype_name = maintypeData!.type_name;

  let totalDetail = 0;
  const sectionDatas = await Section.find({ maintype_id: maintypeData!._id });
  data.sections = quickSort(
    await Promise.all(
      sectionDatas.map(async (section) => {
        const detailDatas = await Detail.find({ section_id: section._id });
        const result = {
          section_id: section._id,
          section_name: section.section_name,
          order: section.order,
          details: await Promise.all(
            detailDatas.map(async (detail) => {
              totalDetail++;
              return {
                detail_id: detail._id,
                detail_name: detail.detail_name,
                is_important: importantData.map((x) => String(x)).includes(String(detail._id)),
                is_completed: completedData.map((x) => String(x)).includes(String(detail._id)),
              };
            }),
          ),
        };
        return result;
      }),
    ),
    (a, b) => a.order - b.order,
  );
  data.percent = Math.round((pathData!.is_completed!.length / totalDetail) * 100);
  data.sections = quickSort(data.sections, (a, b) => a.order - b.order);
  await reply.code(200).send(data);
};

export const getCoursesSimilarTag = async (
  request: FastifyRequest<{ Querystring: { detail_id: string } }>,
  reply: FastifyReply,
) => {
  const detailId = request.query.detail_id;
  const detail = await Detail.findById(detailId, { _id: 1, section_id: 1 });
  const section = await Section.findById(detail?.section_id, { _id: 1, maintype_id: 1 });
  const maintype = await Maintype.findById(section?.maintype_id, { _id: 1 });
  const sections = await Section.find({ maintype_id: maintype!._id }, { _id: 1 });
  const details = await Detail.find({ section_id: { $in: sections.map((x) => x._id) } }, { _id: 1 });
  const courses = await Course.find({ detail_id: { $in: details.map((x) => x._id) } }, { _id: 1 });
  await reply.code(200).send(
    courses.map((x) => ({
      _id: x._id,
      course_level: x.course_level,
    })),
  );
};
