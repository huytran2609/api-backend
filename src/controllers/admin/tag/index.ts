import { FastifyReply, FastifyRequest } from 'fastify';
import { Tag } from '~models/Tag';

export const add = async (request: FastifyRequest<{ Body: { tag_name: string } }>, reply: FastifyReply) => {
  const tag_name = request.body.tag_name;
  const newTag = new Tag({
    tag_name,
  });
  const result = await newTag.save();
  await reply.code(200).send(result);
};

export const remove = async (request: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) => {
  const _id = request.params._id;
  const result = await Tag.findByIdAndRemove(_id);
  await reply.code(200).send(result);
};

export const all = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await Tag.find();
  await reply.code(200).send(result);
};
