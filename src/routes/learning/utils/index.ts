import { FastifyInstance } from 'fastify';
import { getVideo } from '~controllers/learning';
import { verifyAccessToken } from '~middlewares/auth';
import { verifyVideoPayment } from '~middlewares/video';

export default async (server: FastifyInstance) => {
  server.addHook('preHandler', verifyAccessToken);
  server.get(
    '/video/:lesson_id',
    {
      schema: {
        params: {
          type: 'object',
          properties: { lesson_id: { type: 'string' } },
          required: ['lesson_id'],
        },
        querystring: {
          type: 'object',
          properties: {
            course_id: { type: 'string' },
          },
          required: ['course_id'],
        },
      },
      // preHandler: verifyVideoPayment,
    },
    getVideo,
  );
};
