import { Schema, model } from 'mongoose';
import { EPaymentStatus } from '../types/payment.js';
import { softDeletePlugin } from './utils.js';

const paymentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    course_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    payment_status: {
        type: Number,
        required: true,
        enum: EPaymentStatus,
    },
}, { timestamps: true });
paymentSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Payment = model('payment', paymentSchema);

export { Payment };
