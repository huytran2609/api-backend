import { FastifyInstance } from 'fastify';
import { verifyAccessToken } from '~middlewares/auth';
import { getListMyCourse } from '~controllers/mycourse';

export default async (server: FastifyInstance) => {
  server.addHook('preHandler', verifyAccessToken);
  server.get('/list_my_course', getListMyCourse);
};
