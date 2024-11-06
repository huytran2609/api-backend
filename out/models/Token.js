import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';

const tokenSchema = new Schema({
    data: {
        type: String,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });
tokenSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Token = model('token', tokenSchema);

export { Token };
