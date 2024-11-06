import { FastifyInstance } from 'fastify';
import { add, all, remove } from '~controllers/admin/lesson';
import { imageMiddleware } from '~middlewares/image/uploadImageMiddleware';

export default async (server: FastifyInstance) => {
  server.post(
    '/add',
    {
      preHandler: imageMiddleware
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
