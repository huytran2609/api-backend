import { Lesson } from '../../../models/Lesson.js';
import fs from 'fs';

const add = async (request, reply) => {
    const lesson_name = request.form.lesson_name;
    const chapter_id = request.form.chapter_id;
    const duration = request.form.duration;
    const lesson_video = request.form.lesson_video;
    const newLesson = new Lesson({
        chapter_id,
        lesson_name,
        duration,
    });
    const result = await newLesson.save();
    const folder_path = `./stores/Video_Lesson/lesson/${result._id}/`;
    if (!fs.existsSync(folder_path)) {
        await fs.promises.mkdir(folder_path, { recursive: true });
    }
    await fs.promises.writeFile(`${folder_path}lesson_video.mp4`, lesson_video);
    await reply.code(200).send(result);
};
const remove = async (request, reply) => {
    const _id = request.params._id;
    const result = await Lesson.findByIdAndRemove(_id);
    await reply.code(200).send(result);
};
const all = async (request, reply) => {
    const result = await Lesson.find();
    await reply.code(200).send(result);
};

export { add, all, remove };
