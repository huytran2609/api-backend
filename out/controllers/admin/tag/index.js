import { Tag } from '../../../models/Tag.js';

const add = async (request, reply) => {
    const tag_name = request.body.tag_name;
    const newTag = new Tag({
        tag_name,
    });
    const result = await newTag.save();
    await reply.code(200).send(result);
};
const remove = async (request, reply) => {
    const _id = request.params._id;
    const result = await Tag.findByIdAndRemove(_id);
    await reply.code(200).send(result);
};
const all = async (request, reply) => {
    const result = await Tag.find();
    await reply.code(200).send(result);
};

export { add, all, remove };
