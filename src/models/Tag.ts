import { model, Schema } from 'mongoose';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';

export type ITag = {
  tag_name: string;
} & IMyDocument;

const tagSchema = new Schema<ITag>(
  {
    tag_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

tagSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Tag = model<ITag, SoftDeletableModel<ITag>>('tag', tagSchema);
