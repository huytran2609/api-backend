import { model, Schema } from 'mongoose';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';

export type ILearning = {
  lession_id: Schema.Types.ObjectId;
  payment_id: Schema.Types.ObjectId;
  learn_time: Date;
} & IMyDocument;

const learningSchema = new Schema<ILearning>(
  {
    lession_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    payment_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    learn_time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

learningSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Learning = model<ILearning, SoftDeletableModel<ILearning>>('learning', learningSchema);
