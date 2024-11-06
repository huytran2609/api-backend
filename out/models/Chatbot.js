import { Schema, model } from 'mongoose';
import { softDeletePlugin } from './utils.js';
import { EChatbotFrom } from '../types/chatbot.js';

const chatbotSchema = new Schema({
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
}, { timestamps: true });
chatbotSchema.plugin(softDeletePlugin, { deletedAtFieldName: 'deletedAt', overrideMethods: true });
const Chatbot = model('chatbot', chatbotSchema);

export { Chatbot };
