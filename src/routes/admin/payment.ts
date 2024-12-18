import { FastifyInstance } from 'fastify';
import { all, remove, editPayment, confirmPayment } from '~controllers/admin/payment';
import { EPaymentStatus } from '~types/payment';
import { getEnumValues } from '~utils/getEnumValue';

export default async (server: FastifyInstance) => {
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
  server.post(
    '/confirm',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            payment_id: { type: 'string' },
            payment_status: { type: 'number', enum: getEnumValues(EPaymentStatus) },
          },
          required: ['payment_id', 'payment_status'],
        },
      },
    },
    confirmPayment,
  );
  server.post(
    '/edit',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            payment_id: { type: 'string' },
            user_id: { type: 'string' },
            course_id: { type: 'string' },
            total_amount: { type: 'number' },
            payment_status: { type: 'number', enum: getEnumValues(EPaymentStatus) },
          },
          required: ['payment_id'],
        },
      },
    },
    editPayment,
  );
};
