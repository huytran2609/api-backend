import { FastifyInstance } from 'fastify';
import { add, all, remove } from '~controllers/admin/chapter';

export default async (server: FastifyInstance) => {
  server.post(
    '/add',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            chapter_name: { type: 'string' },
            course_id: { type: 'string' },
          },
          required: ['chapter_name', 'course_id'],
        },
      },
    },
    add,
  );
  server.get('/all', all);
  server.delete(
    '/remove/:_id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
          },
          required: ['_id'],
        },
      },
    },
    remove,
  );
};
