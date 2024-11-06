import { FastifyReply, FastifyRequest } from 'fastify';
import { Detail } from '~models/Detail';

export const add = async (
  request: FastifyRequest<{
    Body: {
      section_id: string;
      tag_id: string;
      detail_name: string;
    };
  }>,
  reply: FastifyReply,
) => {
  const section_id = request.body.section_id;
  const tag_id = request.body.tag_id;
  const detail_name = request.body.detail_name;

  const newDetail = new Detail({
    section_id,
    tag_id,
    detail_name,
  });
  const result = await newDetail.save();
  await reply.code(200).send(result);
};

export const remove = async (request: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) => {
  const _id = request.params._id;
  const result = await Detail.findByIdAndRemove(_id);
  await reply.code(200).send(result);
};

export const all = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await Detail.find();
  await reply.code(200).send(result);
};
