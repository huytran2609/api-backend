import jwt from 'jsonwebtoken';
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

export const generateVideoToken = (user, lesson, expiresIn = '120 minutes') => {
  return jwt.sign(
    {
      _id: user._id.toString(),
      username: user.username,
      role: user.role,
      type: 'video',
      lesson_id: lesson.lesson_id,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: expiresIn ?? '120 minutes' },
  );
};

export function verifyVideoToken(request, reply, done) {
  const token = request.query.token;
  if (!token) {
    reply.code(401).send('you must be have video token');
    return;
  }
  jwt.verify(token, process.env.JWT_ACCESS_KEY, (error, user) => {
    if (error) {
      reply.code(403).send('invalid token');
      return;
    } else {
      request.video = user;
      done();
    }
  });
}
