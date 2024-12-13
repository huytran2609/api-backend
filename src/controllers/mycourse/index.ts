import { Payment } from '~models/Payment';
import { Course } from '~models/Course';
import { User } from '~models/User';
import { Detail } from '~models/Detail';
import { Tag } from '~models/Tag';

export const getListMyCourse = async (request, reply) => {
  const user = request.user;
  const payments = await Payment.find({ user_id: user._id });
  const [courses, my] = await Promise.all([
    Course.find({ _id: { $in: payments.map((x) => x.course_id) } }, { course_name: 1, _id: 1, detail_id: 1 }),
    User.findById(user._id),
  ]);
  const details = await Detail.find({ _id: { $in: courses.map((x) => x.detail_id) } }, { _id: 1, tag_id: 1 });
  const tags = await Tag.find({ _id: { $in: details.map((x) => x._id) } }, { _id: 1, tag_name: 1 });
  const result = {
    courses,
    user: my,
    tags,
  };
  await reply.code(200).send(result);
};
