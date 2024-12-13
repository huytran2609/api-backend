import { FastifyReply, FastifyRequest } from 'fastify';
import { Chapter } from '~models/Chapter';

export const add = async (
  request: FastifyRequest<{ Body: { chapter_name: string; course_id: string; order: number } }>,
  reply: FastifyReply,
) => {
  const chapter_name = request.body.chapter_name;
  const course_id = request.body.course_id;
  const order = request.body.order;
  const newChapter = new Chapter({
    course_id,
    chapter_name,
    order,
  });
  const result = await newChapter.save();
  await reply.code(200).send(result);
};

export const remove = async (request: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) => {
  const _id = request.params._id;
  const result = await Chapter.findByIdAndRemove(_id);
  await reply.code(200).send(result);
};

export const all = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await Chapter.find().populate('course_id', 'course_name');
  await reply.code(200).send(result);
};
