import { model, Schema } from 'mongoose';
import { EPaymentStatus } from '~types/payment';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';

export type IPayment = {
  user_id: Schema.Types.ObjectId;
  course_id: Schema.Types.ObjectId;
  total_amount: number;
  payment_status: EPaymentStatus;
} & IMyDocument;

const paymentSchema = new Schema<IPayment>(
  {
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
  },
  { timestamps: true },
);

paymentSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Payment = model<IPayment, SoftDeletableModel<IPayment>>('payment', paymentSchema);
