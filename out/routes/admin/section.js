import { add, all, remove } from '../../controllers/admin/section/index.js';

var section = async (server) => {
    server.post('/add', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    section_name: { type: 'string' },
                    maintype_id: { type: 'string' },
                },
                required: ['section_name', 'maintype_id'],
            },
        },
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

export { section as default };
