import { model, Schema } from 'mongoose';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';

export type ILesson = {
  chapter_id: Schema.Types.ObjectId;
  lesson_name: string;
  duration: number;
  order: number;
} & IMyDocument;

const lessonSchema = new Schema<ILesson>(
  {
    chapter_id: {
      type: Schema.Types.ObjectId,
      ref: 'chapter',
      required: true,
    },
    lesson_name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
    },
    order: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true },
);

lessonSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Lesson = model<ILesson, SoftDeletableModel<ILesson>>('lesson', lessonSchema);
