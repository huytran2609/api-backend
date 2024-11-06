import { model, Schema } from 'mongoose';
import { IMyDocument, softDeletePlugin } from './utils';
import SoftDeletableModel from './utils';
import { ERole } from '~types/index';

export type IUser = {
  role: ERole;
  username: string;
  email: string;
  password: string;
  fullname: string;
  phone?: string;
  biography?: string;
  birthday?: Date;
  facebook?: string;
  job?: string;
  recommend?: {
    maintype: Schema.Types.ObjectId;
    percent: number;
  }[];
} & IMyDocument;

const userSchema = new Schema<IUser>(
  {
    role: {
      type: Number,
      enum: ERole,
      require: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    biography: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    facebook: {
      type: String,
    },
    job: {
      type: String,
    },
    recommend: {
      type: [
        {
          maintype: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          percent: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true },
);

userSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const User = model<IUser, SoftDeletableModel<IUser>>('user', userSchema);
