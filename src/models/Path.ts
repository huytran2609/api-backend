import { model, Schema } from 'mongoose';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';

export type IPath = {
  user_id: Schema.Types.ObjectId;
  is_completed: Schema.Types.ObjectId[];
  is_important: Schema.Types.ObjectId[];
} & IMyDocument;

const pathSchema = new Schema<IPath>(
  {
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
  },
  { timestamps: true },
);

pathSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Path = model<IPath, SoftDeletableModel<IPath>>('path', pathSchema);
