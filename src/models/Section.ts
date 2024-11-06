import { model, Schema } from 'mongoose';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';

export type ISection = {
  maintype_id: Schema.Types.ObjectId;
  section_name: string;
  order: number;
} & IMyDocument;

const sectionSchema = new Schema<ISection>(
  {
    maintype_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    section_name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

sectionSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Section = model<ISection, SoftDeletableModel<ISection>>('section', sectionSchema);
