import { FastifyReply, FastifyRequest } from 'fastify';
import { Chatbot } from '~models/Chatbot';
import { chat } from '~python/chatbot';
import { EChatbotFrom } from '~types/chatbot';

export const getChat = async (request: FastifyRequest<{ Querystring: { question: string } }>, reply: FastifyReply) => {
  const question = request.query.question;
  const user = request.user!;

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
