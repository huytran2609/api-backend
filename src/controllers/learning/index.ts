import { FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs';
import path from 'path';
import { generateVideoToken } from '~middlewares/video';

export const getVideo = async (
  request: FastifyRequest<{ Params: { lesson_id: string }; Querystring: { course_id: string } }>,
  reply: FastifyReply,
) => {
  const lessonId = request.params.lesson_id;
  const user = request.user;
  const videoToken = generateVideoToken(user, { lesson_id: lessonId });
  await reply.code(200).send({
    videoToken,
  });
};

export const streamVideo = async (request, reply) => {
  const video = request.video;
  const videoPath = path.join(`./stores/lesson/${video.lesson_id}/lesson_video.mp4`);
  reply.header('Content-Type', 'video/mp4');
  reply.header('Content-Disposition', `inline; filename="lesson_video.mp4"`);
  const videoStream = fs.createReadStream(videoPath);
  await reply.send(videoStream);
};
