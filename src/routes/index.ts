import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import admin from './admin/index';
import auth from './auth';
import recommend from './recommend';
import roadmap from './roadmap';
import course from './course';
import payment from './payment';
import learning from './learning';
import chatbot from './chatbot';

export default async (server: FastifyInstance, options: FastifyPluginOptions) => {
  server.get('/', {}, async (request, reply) => {
    return reply.code(200).send({ message: 'hello' });
  });
  server.register(admin, { prefix: 'admin' });
  server.register(auth, { prefix: 'auth' });
  server.register(recommend, { prefix: 'recommend' });
  server.register(roadmap, { prefix: 'roadmap' });
  server.register(course, { prefix: 'course' });
  server.register(payment, { prefix: 'payment' });
  server.register(learning, { prefix: 'learning' });
  server.register(chatbot, { prefix: 'chatbot' });
};
