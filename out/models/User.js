import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';
import { ERole } from '../types/index.js';

const userSchema = new Schema({
    role: {
        type: Number,
        enum: ERole,
        require: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    biography: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    facebook: {
        type: String,
    },
    job: {
        type: String,
    },
    recommend: {
        type: [
            {
                maintype: {
                    type: Schema.Types.ObjectId,
                    required: true,
                },
                percent: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
}, { timestamps: true });
userSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const User = model('user', userSchema);

export { User };
