import { FastifyInstance } from 'fastify';
import { getChat } from '~controllers/chatbot';
import { verifyAccessToken } from '~middlewares/auth';

export default async (server: FastifyInstance) => {
  server.addHook('preHandler', verifyAccessToken);
  server.get(
    '/chat',
    {
      schema: { querystring: { type: 'object', properties: { question: { type: 'string' } }, required: ['question'] } },
    },
    getChat,
  );
};
