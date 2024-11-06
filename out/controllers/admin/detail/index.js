import { Detail } from '../../../models/Detail.js';

const add = async (request, reply) => {
    const section_id = request.body.section_id;
    const tag_id = request.body.tag_id;
    const detail_name = request.body.detail_name;
    const newDetail = new Detail({
        section_id,
        tag_id,
        detail_name,
    });
    const result = await newDetail.save();
    await reply.code(200).send(result);
};
const remove = async (request, reply) => {
    const _id = request.params._id;
    const result = await Detail.findByIdAndRemove(_id);
    await reply.code(200).send(result);
};
const all = async (request, reply) => {
    const result = await Detail.find();
    await reply.code(200).send(result);
};

export { add, all, remove };
