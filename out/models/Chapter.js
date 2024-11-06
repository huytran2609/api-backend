import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';

const chapterSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true,
    },
    chapter_name: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: false,
    },
}, { timestamps: true });
chapterSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Chapter = model('chapter', chapterSchema);

export { Chapter };
