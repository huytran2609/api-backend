import { FastifyInstance } from 'fastify';
import { checkStatus, chooseMaintype, listTag, processRecommend } from '~controllers/recommend';
import { verifyAccessToken } from '~middlewares/auth';

export default async (server: FastifyInstance) => {
  server.addHook('preHandler', verifyAccessToken);
  server.get(
    '/check_status/:user_id',
    { schema: { params: { type: 'object', properties: { user_id: { type: 'string' } }, required: ['user_id'] } } },
    checkStatus,
  );
  server.get('/list_tag', listTag);
  server.post(
    '/process_recommend',
    { schema: { body: { type: 'object', properties: { skills: { type: 'array' } }, required: ['skills'] } } },
    processRecommend,
  );
  server.get(
    '/choose_maintype',
    { schema: { querystring: { type: 'object', properties: { choosen: { type: 'string' } }, required: ['choosen'] } } },
    chooseMaintype,
  );
};
