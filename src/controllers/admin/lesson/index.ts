import { FastifyReply, FastifyRequest } from 'fastify';
import { Lesson } from '~models/Lesson';
import fs from 'fs';
export const add = async (request: FastifyRequest, reply: FastifyReply) => {
  const lesson_name = request.form!.lesson_name;
  const chapter_id = request.form!.chapter_id;
  // const duration = request.form!.duration;
  const lesson_video = request.form!.lesson_video;
  const newLesson = new Lesson({
    chapter_id,
    lesson_name,
    // duration,
  });

  const result = await newLesson.save();
  const folder_path = `./stores/lesson/${result._id}/`;

  if (!fs.existsSync(folder_path)) {
    await fs.promises.mkdir(folder_path, { recursive: true });
  }
  await fs.promises.writeFile(`${folder_path}lesson_video.mp4`, lesson_video as Buffer);
  await reply.code(200).send(result);
};

export const remove = async (request: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) => {
  const _id = request.params._id;
  const result = await Lesson.findByIdAndRemove(_id);
  await reply.code(200).send(result);
};

export const all = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await Lesson.find().populate({
    path: 'chapter_id',
    select: 'chapter_name',
    populate: {
      path: 'course_id',
      select: 'course_name',
      populate: {
        path: 'detail_id',
        populate: {
          path: 'section_id',
          populate: {
            path: 'maintype_id',
            select: 'type_name',
          },
        },
      },
    },
  });
  await reply.code(200).send(result);
};
