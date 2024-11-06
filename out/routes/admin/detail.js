import { add, all, remove } from '../../controllers/admin/detail/index.js';

var detail = async (server) => {
    server.post('/add', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    section_id: {
                        type: 'string',
                    },
                    tag_id: {
                        type: 'string',
                    },
                    detail_name: {
                        type: 'string',
                    },
                },
                required: ['section_id', 'tag_id', 'detail_name'],
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

export { detail as default };
