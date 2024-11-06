import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';

const tagSchema = new Schema({
    tag_name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
tagSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Tag = model('tag', tagSchema);

export { Tag };
