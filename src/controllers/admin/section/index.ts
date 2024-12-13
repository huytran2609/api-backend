import { FastifyReply, FastifyRequest } from 'fastify';
import { Section } from '~models/Section';

export const add = async (
  request: FastifyRequest<{ Body: { section_name: string; maintype_id: string; order: number } }>,
  reply: FastifyReply,
) => {
  const section_name = request.body.section_name;
  const maintype_id = request.body.maintype_id;
  const order = request.body.order;
  const newSection = new Section({
    maintype_id,
    section_name,
    order,
  });
  const result = await newSection.save();
  await reply.code(200).send(result);
};

export const remove = async (request: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) => {
  const _id = request.params._id;
  const result = await Section.findByIdAndRemove(_id);
  await reply.code(200).send(result);
};

export const all = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await Section.find().populate('maintype_id', 'type_name');
  await reply.code(200).send(result);
};

export const getSectionByMainTypeId = async (request, reply) => {
  const maintypeId = request.query.maintype_id;
  const sections = await Section.find({ maintype_id: maintypeId });
  await reply.code(200).send(sections);
};
