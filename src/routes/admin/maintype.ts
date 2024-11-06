import { FastifyInstance } from 'fastify';
import { add, all, remove } from '~controllers/admin/maintype';

export default async (server: FastifyInstance) => {
  server.post(
    '/add',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            type_name: { type: 'string' },
          },
          required: ['type_name'],
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
