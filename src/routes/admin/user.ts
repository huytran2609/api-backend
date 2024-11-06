import { FastifyInstance } from 'fastify';
import { all } from '~controllers/admin/user';

export default async (server: FastifyInstance) => {
  server.get('/all', all);
};
