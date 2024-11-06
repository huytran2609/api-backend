import { FastifyReply, FastifyRequest } from 'fastify';
import { Maintype } from '~models/Maintype';

export const add = async (request: FastifyRequest<{ Body: { type_name: string } }>, reply: FastifyReply) => {
  const type_name = request.body.type_name;
  const newMaintype = new Maintype({
    type_name,
  });
  const result = await newMaintype.save();
  await reply.code(200).send(result);
};

export const remove = async (request: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) => {
  const _id = request.params._id;
  const result = await Maintype.findByIdAndRemove(_id);
  await reply.code(200).send(result);
};

export const all = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await Maintype.find();
  await reply.code(200).send(result);
};
