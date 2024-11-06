import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';

const maintypeSchema = new Schema({
    type_name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
maintypeSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Maintype = model('maintype', maintypeSchema);

export { Maintype };
