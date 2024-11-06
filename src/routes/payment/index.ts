import { FastifyInstance } from 'fastify';
import { checkPayment, getCoursePrice, getCoursesSimilar, makePayment } from '~controllers/payment';
import { verifyAccessToken } from '~middlewares/auth';

export default async (server: FastifyInstance) => {
  server.addHook('preHandler', verifyAccessToken);
  server.get(
    '/courses_similar',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            course_id: { type: 'string' },
          },
          required: ['course_id'],
        },
      },
    },
    getCoursesSimilar,
  );
  server.get(
    '/course_price',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            course_id: { type: 'string' },
          },
          required: ['course_id'],
        },
      },
    },
    getCoursePrice,
  );
  server.get(
    '/check_payment',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            course_id: { type: 'string' },
          },
          required: ['course_id'],
        },
      },
    },
    checkPayment,
  );
  server.get(
    '/make_payment',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            course_id: { type: 'string' },
          },
          required: ['course_id'],
        },
      },
    },
    makePayment,
  );
};
