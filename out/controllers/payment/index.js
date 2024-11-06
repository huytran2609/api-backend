import { Chapter } from '../../models/Chapter.js';
import { Course } from '../../models/Course.js';
import { Detail } from '../../models/Detail.js';
import { Lesson } from '../../models/Lesson.js';
import { Maintype } from '../../models/Maintype.js';
import { Payment } from '../../models/Payment.js';
import { Section } from '../../models/Section.js';
import { EPaymentStatus } from '../../types/payment.js';

const getCoursesSimilar = async (request, reply) => {
    const courseId = request.query.course_id;
    const course = await Course.findById(courseId);
    const detail = await Detail.findById(course?.detail_id, { _id: 1, tag_id: 1, section_id: 1 });
    const section = await Section.findById(detail?.section_id, { _id: 1, maintype_id: 1 });
    const maintype = await Maintype.findById(section?.maintype_id, { _id: 1 });
    const sections = await Section.find({ maintype_id: maintype._id }, { _id: 1 });
    const details = await Detail.find({ section_id: { $in: sections.map((x) => x._id) } }, { _id: 1 });
    const courses = await Course.find({ detail_id: { $in: details.map((x) => x._id) } }, { _id: 1 });
    await reply.code(200).send(courses.map((x) => ({
        _id: x._id,
    })));
};
const getCoursePrice = async (request, reply) => {
    const courseId = request.query.course_id;
    const course = await Course.findById(courseId);
    const chapters = await Chapter.find({ course_id: course._id }, { _id: 1 });
    const lessonQuantity = await Lesson.count({ _id: { $in: chapters.map((x) => x._id) } });
    const result = {
        ...course?.toObject(),
        lesson_quantity: lessonQuantity,
    };
    await reply.code(200).send(result);
};
const makePayment = async (request, reply) => {
    const courseId = request.query.course_id;
    const user = request.user;
    const course = await Course.findById(courseId);
    const newPayment = new Payment({
        user_id: user?._id,
        course_id: courseId,
        total_amount: course?.course_fee,
        payment_status: EPaymentStatus.PAID,
    });
    const result = await newPayment.save();
    await reply.code(200).send(result);
};
const checkPayment = async (request, reply) => {
    const courseId = request.query.course_id;
    const user = request.user;
    const isPaid = await Payment.exists({ user_id: user._id, course_id: courseId, payment_status: EPaymentStatus.PAID });
    await reply.code(200).send({
        is_paid: Boolean(isPaid?._id),
    });
};

export { checkPayment, getCoursePrice, getCoursesSimilar, makePayment };
