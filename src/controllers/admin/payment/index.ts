import { FastifyReply, FastifyRequest } from 'fastify';
import { Course } from '~models/Course';
import { Payment } from '~models/Payment';
import { User } from '~models/User';
import { removeUndefinedProps } from '~utils/removeUndefinedProps';

export const all = async (request, reply) => {
  const payments = await Payment.find({}, {}, { sort: { createdAt: 1 } });
  const [users, courses] = await Promise.all([
    User.find({ _id: { $in: payments.map((x) => x.user_id) } }, { _id: 1, fullname: 1 }),
    Course.find({ _id: { $in: payments.map((x) => x.course_id) } }, { _id: 1, course_name: 1 }),
  ]);
  const result = payments
    .map((payment) => {
      const user = users.find((x) => x._id.toString() === payment.user_id.toString());
      if (!user) return;
      const course = courses.find((x) => x._id.toString() === payment.course_id.toString());
      if (!course) return;
      return {
        ...user?.toObject(),
        ...course.toObject(),
        ...payment.toObject(),
      };
    })
    .filter(Boolean);
  await reply.code(200).send(result);
};

export const remove = async (request, reply) => {
  const _id = request.params._id;
  const result = await Payment.findByIdAndRemove(_id);
  await reply.code(200).send(result);
};

export const editPayment = async (request, reply) => {
  const paymentId = request.body.payment_id;
  const userId = request.body.user_id;
  const courseId = request.body.course_id;
  const totalAmount = request.body.total_amount;
  const paymentStatus = request.body.payment_status;
  await Payment.updateOne(
    { _id: paymentId },
    {
      $set: removeUndefinedProps({
        user_id: userId || undefined,
        course_id: courseId || undefined,
        total_amount: totalAmount || undefined,
        payment_status: paymentStatus || undefined,
      }),
    },
  );
  await reply.code(200).send('success');
};

export const confirmPayment = async (request, reply) => {
  const paymentId = request.body.payment_id;
  const paymentStatus = request.body.payment_status;
  const paymentData = await Payment.findById(paymentId);
  const [userData, courseData] = await Promise.all([
    User.findById(paymentData?.user_id),
    Course.findById(paymentData?.course_id),
  ]);
  if (!userData || !courseData) {
    await reply.code(400).send('not found user');
    return;
  }
  await Promise.all([Payment.findByIdAndUpdate(paymentId, { $set: { payment_status: paymentStatus } })]);
  await reply.code(200).send('success');
};
