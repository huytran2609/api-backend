import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '~models/User';

export const all = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await User.find();
  await reply.code(200).send(result);
};
