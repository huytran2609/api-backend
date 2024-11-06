import { model, Schema } from 'mongoose';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';
import { EApprovalsStatus, ECourseStatus, ELanguage, ELevel } from '~types/course';

export type ICourse = {
  author_id: Schema.Types.ObjectId;
  detail_id: Schema.Types.ObjectId;
  course_level: ELevel;
  course_language: ELanguage;
  course_name: string;
  approval_status: EApprovalsStatus;
  course_fee: number;
  description: string;
  course_status: ECourseStatus;
} & IMyDocument;

const courseSchema = new Schema<ICourse>(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    detail_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    course_level: {
      type: Number,
      required: true,
      enum: ELevel,
    },
    course_language: {
      type: Number,
      required: true,
      enum: ELanguage,
    },
    course_name: {
      type: String,
      required: true,
    },
    approval_status: {
      type: Number,
      required: true,
      enum: EApprovalsStatus,
    },
    course_fee: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    course_status: {
      type: Number,
      required: true,
      enum: ECourseStatus,
    },
  },
  { timestamps: true },
);

courseSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Course = model<ICourse, SoftDeletableModel<ICourse>>('course', courseSchema);
