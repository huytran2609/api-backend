import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getEnumValues } from '~utils/getEnumValue';
import { ELanguage, ELevel } from '~types/course';
import { searchCourses } from '~controllers/search';

export default async (server: FastifyInstance) => {
  server.post(
    '/courses',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            search: { type: 'string' },
            maintype_id: { type: 'string' },
            course_languages: { type: 'number', enum: getEnumValues(ELanguage) },
            course_level: { type: 'number', enum: getEnumValues(ELevel) },
          },
        },
      },
    },
    searchCourses,
  );
  //   server.get('/all_maintype', all$9);
  //   server.get('/all_author', all$2);
};
