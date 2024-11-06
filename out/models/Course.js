import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';
import { ELevel, ELanguage, EApprovalsStatus, ECourseStatus } from '../types/course.js';

const courseSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    detail_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    course_level: {
        type: Number,
        required: true,
        enum: ELevel,
    },
    course_language: {
        type: Number,
        required: true,
        enum: ELanguage,
    },
    course_name: {
        type: String,
        required: true,
    },
    approval_status: {
        type: Number,
        required: true,
        enum: EApprovalsStatus,
    },
    course_fee: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    course_status: {
        type: Number,
        required: true,
        enum: ECourseStatus,
    },
}, { timestamps: true });
courseSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Course = model('course', courseSchema);

export { Course };
