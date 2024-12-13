import { model, Schema } from 'mongoose';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';

export type IDetail = {
  section_id: Schema.Types.ObjectId;
  tag_id: Schema.Types.ObjectId;
  detail_name: string;
} & IMyDocument;

const detailSchema = new Schema<IDetail>(
  {
    section_id: {
      type: Schema.Types.ObjectId,
      ref: 'section',
      required: true,
    },
    tag_id: {
      type: Schema.Types.ObjectId,
      ref: 'tag',
      required: true,
    },

    detail_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

detailSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Detail = model<IDetail, SoftDeletableModel<IDetail>>('detail', detailSchema);
