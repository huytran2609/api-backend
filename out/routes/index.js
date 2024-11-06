import admin from './admin/index.js';
import auth from './auth/index.js';
import recommend from './recommend/index.js';
import roadmap from './roadmap/index.js';
import course from './course/index.js';
import payment from './payment/index.js';
import learning from './learning/index.js';
import chatbot from './chatbot/index.js';

var routes = async (server, options) => {
    server.get('/', {}, async (request, reply) => {
        return reply.code(200).send({ message: 'hello' });
    });
    server.register(admin, { prefix: 'admin' });
    server.register(auth, { prefix: 'auth' });
    server.register(recommend, { prefix: 'recommend' });
    server.register(roadmap, { prefix: 'roadmap' });
    server.register(course, { prefix: 'course' });
    server.register(payment, { prefix: 'payment' });
    server.register(learning, { prefix: 'learning' });
    server.register(chatbot, { prefix: 'chatbot' });
};

export { routes as default };
