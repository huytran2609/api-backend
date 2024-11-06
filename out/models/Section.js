import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';

const sectionSchema = new Schema({
    maintype_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    section_name: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
sectionSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Section = model('section', sectionSchema);

export { Section };
