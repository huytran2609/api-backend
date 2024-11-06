import { FastifyInstance } from 'fastify';
import { login, register } from '~controllers/auth';

export default async (server: FastifyInstance) => {
  server.post(
    '/register',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            fullname: {
              type: 'string',
            },
            phone: {
              type: 'string',
            },
            biography: {
              type: 'string',
            },
            birthday: {
              type: 'string',
            },
            facebook: {
              type: 'string',
            },
            job: {
              type: 'string',
            },
          },
          required: ['username', 'email', 'password', 'fullname'],
        },
      },
    },
    register,
  );
  server.post(
    '/login',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['username', 'password'],
        },
      },
    },
    login,
  );
};
