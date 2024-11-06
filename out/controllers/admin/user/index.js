import { User } from '../../../models/User.js';

const all = async (request, reply) => {
    const result = await User.find();
    await reply.code(200).send(result);
};

export { all };
