import { Course } from '../../../models/Course.js';
import fs from 'fs';

const add = async (request, reply) => {
    const author_id = request.form.author_id;
    const detail_id = request.form.detail_id;
    const course_level = request.form.course_level;
    const course_language = request.form.course_language;
    const course_name = request.form.course_name;
    const approval_status = request.form.approval_status;
    const course_fee = request.form.course_fee;
    const description = request.form.description;
    const course_status = request.form.course_status;
    const course_img = request.form.course_img;
    const newCourse = new Course({
        author_id,
        detail_id,
        course_level,
        course_language,
        course_name,
        approval_status,
        course_fee,
        description,
        course_status,
    });
    const result = await newCourse.save();
    const folder_path = `./public/course/${result._id}/`;
    if (!fs.existsSync(folder_path)) {
        await fs.promises.mkdir(folder_path, { recursive: true });
    }
    await fs.promises.writeFile(`./public/course/${result._id}/course_img.jpeg`, course_img);
    await reply.code(200).send('result');
};
const remove = async (request, reply) => {
    const _id = request.params._id;
    const result = await Course.findByIdAndRemove(_id);
    await reply.code(200).send(result);
};
const all = async (request, reply) => {
    const result = await Course.find();
    await reply.code(200).send(result);
};

export { add, all, remove };
