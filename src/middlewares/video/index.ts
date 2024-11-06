import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import { Chapter } from '~models/Chapter';
import { Payment } from '~models/Payment';

export const verifyVideoPayment = async (
  request: FastifyRequest<{ Params: { lesson_id: string }; Querystring: { course_id: string } }>,
  reply: FastifyReply,
) => {
  const courseId = request.query.course_id;
  const user = request.user;
  const isPaid = await Payment.exists({ user_id: user!._id, course_id: courseId });
  if (!isPaid) {
    await reply.code(401).send('you must be purchase');
    return;
  }
};
