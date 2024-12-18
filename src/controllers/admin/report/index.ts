import { FastifyReply, FastifyRequest } from 'fastify';
import { Course } from '~models/Course';
import { Payment } from '~models/Payment';
import { User } from '~models/User';

export const mainReport = async (request, reply) => {
  const [payments, topCourses, totalMembers, topMembers] = await Promise.all([
    Payment.find(),
    Payment.aggregate([
      {
        $group: {
          _id: '$course_id',
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]),
    Payment.distinct('user_id').then((success) => success.length),
    Payment.aggregate([
      {
        $group: {
          _id: '$user_id',
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]),
  ]);
  const [courses, users] = await Promise.all([
    Course.find({ _id: { $in: topCourses.map((x) => x._id) } }),
    User.find({ _id: { $in: topMembers.map((x) => x._id) } }),
  ]);
  const result = {
    totalRevenue: payments.reduce((acc, curr) => acc + curr.total_amount, 0),
    totalOrders: payments.length,
    topCourses: courses,
    topUsers: users,
    totalMembers: totalMembers,
  };
  await reply.code(200).send(result);
};
