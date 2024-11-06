import { Maintype } from '../../../models/Maintype.js';

const add = async (request, reply) => {
    const type_name = request.body.type_name;
    const newMaintype = new Maintype({
        type_name,
    });
    const result = await newMaintype.save();
    await reply.code(200).send(result);
};
const remove = async (request, reply) => {
    const _id = request.params._id;
    const result = await Maintype.findByIdAndRemove(_id);
    await reply.code(200).send(result);
};
const all = async (request, reply) => {
    const result = await Maintype.find();
    await reply.code(200).send(result);
};

export { add, all, remove };
