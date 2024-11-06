import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';

const detailSchema = new Schema({
    section_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    tag_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    detail_name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
detailSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Detail = model('detail', detailSchema);

export { Detail };
