import { FastifyInstance } from 'fastify';
import { add, all, getSectionByMainTypeId, remove } from '~controllers/admin/section';

export default async (server: FastifyInstance) => {
  server.post(
    '/add',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            section_name: { type: 'string' },
            maintype_id: { type: 'string' },
          },
          required: ['section_name', 'maintype_id'],
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
  server.get(
    '/section_by_main_type_id',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            maintype_id: { type: 'string' },
          },
          required: ['maintype_id'],
        },
      },
    },
    getSectionByMainTypeId,
  );
};
