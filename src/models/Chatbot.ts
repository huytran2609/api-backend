import { model, Schema } from 'mongoose';
import SoftDeletableModel, { IMyDocument, softDeletePlugin } from './utils';
import { EChatbotFrom } from '~types/chatbot';

export type IChatbot = {
  user_id: Schema.Types.ObjectId;
  from: EChatbotFrom;
  messages: string;
} & IMyDocument;

const chatbotSchema = new Schema<IChatbot>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    from: {
      type: Number,
      enum: EChatbotFrom,
      required: true,
    },
    messages: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

chatbotSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });

export const Chatbot = model<IChatbot, SoftDeletableModel<IChatbot>>('chatbot', chatbotSchema);
