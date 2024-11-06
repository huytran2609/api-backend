import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';

const lessonSchema = new Schema({
    chapter_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    lesson_name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
lessonSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Lesson = model('lesson', lessonSchema);

export { Lesson };
