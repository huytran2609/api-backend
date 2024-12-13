import { FastifyInstance } from 'fastify';
import { verifyVideoToken } from '~middlewares/video';
import { streamVideo } from '~controllers/learning';

export default async (server: FastifyInstance) => {
  server.addHook('preHandler', verifyVideoToken);
  server.get('/stream', streamVideo);
};
