import { FastifyInstance } from 'fastify';
import user from './user';
import maintype from './maintype';
import section from './section';
import course from './course';
import tag from './tag';
import detail from './detail';
import chapter from './chapter';
import lesson from './lesson';
import payment from './payment';
import report from './report';

export default async (server: FastifyInstance) => {
  server.register(user, { prefix: 'user' });
  server.register(maintype, { prefix: 'maintype' });
  server.register(section, { prefix: 'section' });
  server.register(course, { prefix: 'course' });
  server.register(tag, { prefix: 'tag' });
  server.register(detail, { prefix: 'detail' });
  server.register(chapter, { prefix: 'chapter' });
  server.register(lesson, { prefix: 'lesson' });
  server.register(payment, { prefix: 'payment' });
  server.register(report, { prefix: 'report' });
};
