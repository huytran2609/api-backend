import { FastifyInstance } from 'fastify';
import { mainReport } from '~controllers/admin/report';

export default async (server: FastifyInstance) => {
  server.get('/main_report', mainReport);
};
