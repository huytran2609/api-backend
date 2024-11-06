import { FastifyInstance } from 'fastify';
import { getCourse } from '~controllers/course';

export default async (server: FastifyInstance) => {
  server.get(
    '/item/:course_id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            course_id: { type: 'string' },
          },
          required: ['course_id'],
        },
      },
    },
    getCourse,
  );
};
