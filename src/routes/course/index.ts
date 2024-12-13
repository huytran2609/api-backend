import { FastifyInstance } from 'fastify';
import { getCourse, getCoursesOfMaintype, randomCourses, allCourses } from '~controllers/course';
import { ELevel } from '~types/course';
import { getEnumValues } from '~utils/getEnumValue';

export default async (server: FastifyInstance) => {
  server.get(
    '/item/:course_id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            course_id: { type: 'string' },
          },
          required: ['course_id'],
        },
      },
    },
    getCourse,
  );
  server.get(
    '/courses_of_maintype',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            course_id: { type: 'string' },
            take: { type: 'number' },
            random: { type: 'boolean' },
          },
          required: ['course_id'],
        },
      },
    },
    getCoursesOfMaintype,
  );
  server.get(
    '/all_courses',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: { course_level: { type: 'number', enum: getEnumValues(ELevel).map((x) => Number(x)) } },
        },
      },
    },
    allCourses,
  );
  server.get('/random_courses', randomCourses);
};
