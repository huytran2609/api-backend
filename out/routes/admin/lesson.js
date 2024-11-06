import { add, all, remove } from '../../controllers/admin/lesson/index.js';
import { imageMiddleware } from '../../middlewares/image/uploadImageMiddleware.js';

var lesson = async (server) => {
    server.post('/add', {
        preHandler: imageMiddleware
    }, add);
    server.get('/all', all);
    server.delete('/remove/:_id', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                },
                required: ['_id'],
            },
        },
    }, remove);
};

export { lesson as default };
