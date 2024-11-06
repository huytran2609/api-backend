import { FastifyInstance } from 'fastify';
import { getCoursesSimilarTag, myRoadmap } from '~controllers/roadmap';
import { verifyAccessToken } from '~middlewares/auth';

export default async (server: FastifyInstance) => {
  server.addHook('preHandler', verifyAccessToken);
  server.get('/my_roadmap', myRoadmap);
  server.get(
    '/courses_similar_tag',
    {
      schema: {
        querystring: { type: 'object', properties: { detail_id: { type: 'string' } }, required: ['detail_id'] },
      },
    },
    getCoursesSimilarTag,
  );
};
