import { model, Schema } from 'mongoose';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';
import { EStart } from '~types/review';

export type IReview = {
  user_id: Schema.Types.ObjectId;
  course_id: Schema.Types.ObjectId;
  course_review_star: EStart;
  content: string;
} & IMyDocument;

const reviewSchema = new Schema<IReview>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    course_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    course_review_star: {
      type: Number,
      required: true,
      enum: EStart,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

reviewSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Review = model<IReview, SoftDeletableModel<IReview>>('review', reviewSchema);
