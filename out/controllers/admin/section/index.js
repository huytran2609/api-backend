import { Section } from '../../../models/Section.js';

const add = async (request, reply) => {
    const section_name = request.body.section_name;
    const maintype_id = request.body.maintype_id;
    const newSection = new Section({
        maintype_id,
        section_name,
    });
    const result = await newSection.save();
    await reply.code(200).send(result);
};
const remove = async (request, reply) => {
    const _id = request.params._id;
    const result = await Section.findByIdAndRemove(_id);
    await reply.code(200).send(result);
};
const all = async (request, reply) => {
    const result = await Section.find();
    await reply.code(200).send(result);
};

export { add, all, remove };
