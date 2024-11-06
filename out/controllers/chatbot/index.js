import { Chatbot } from '../../models/Chatbot.js';
import { chat } from '../../python/chatbot/index.js';
import { EChatbotFrom } from '../../types/chatbot.js';

const getChat = async (request, reply) => {
    const question = request.query.question;
    const user = request.user;
    const [, messages] = await Promise.all([
        new Chatbot({
            user_id: user._id,
            from: EChatbotFrom.STUDENT,
            messages: question,
        }).save(),
        chat(question)
            .then((success) => success.data)
            .catch((error) => console.log(error)),
    ]);
    const messagesData = await new Chatbot({
        user_id: user._id,
        from: EChatbotFrom.BOT,
        messages: messages,
    }).save();
    await reply.code(200).send(messagesData);
};

export { getChat };
