import { FastifyInstance } from 'fastify';
import utils from './utils';
import video from './video';

export default async (server: FastifyInstance) => {
  server.register(utils, { prefix: 'utils' });
  server.register(video, { prefix: 'video' });
};
