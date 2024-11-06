import { Payment } from '../../models/Payment.js';

const verifyVideoPayment = async (request, reply) => {
    const courseId = request.query.course_id;
    const user = request.user;
    const isPaid = await Payment.exists({ user_id: user._id, course_id: courseId });
    if (!isPaid) {
        await reply.code(401).send('you must be purchase');
        return;
    }
};

export { verifyVideoPayment };
