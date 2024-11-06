import { getChat } from '../../controllers/chatbot/index.js';
import { verifyAccessToken } from '../../middlewares/auth/index.js';

var chatbot = async (server) => {
    server.addHook('preHandler', verifyAccessToken);
    server.get('/chat', {
        schema: { querystring: { type: 'object', properties: { question: { type: 'string' } }, required: ['question'] } },
    }, getChat);
};

export { chatbot as default };
