import { model, Schema } from 'mongoose';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';

export type IMaintype = {
  type_name: string;
} & IMyDocument;

const maintypeSchema = new Schema<IMaintype>(
  {
    type_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

maintypeSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Maintype = model<IMaintype, SoftDeletableModel<IMaintype>>('maintype', maintypeSchema);
