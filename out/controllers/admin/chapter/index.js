import { Chapter } from '../../../models/Chapter.js';

const add = async (request, reply) => {
    const chapter_name = request.body.chapter_name;
    const course_id = request.body.course_id;
    const newChapter = new Chapter({
        course_id,
        chapter_name,
    });
    const result = await newChapter.save();
    await reply.code(200).send(result);
};
const remove = async (request, reply) => {
    const _id = request.params._id;
    const result = await Chapter.findByIdAndRemove(_id);
    await reply.code(200).send(result);
};
const all = async (request, reply) => {
    const result = await Chapter.find().populate('course_id', 'course_name');
    await reply.code(200).send(result);
};

export { add, all, remove };
