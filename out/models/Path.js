import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';

const pathSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    is_completed: {
        type: [Schema.Types.ObjectId],
        required: true,
        default: [],
    },
    is_important: {
        type: [Schema.Types.ObjectId],
        required: true,
        default: [],
    },
}, { timestamps: true });
pathSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Path = model('path', pathSchema);

export { Path };
