import { getCourse } from '../../controllers/course/index.js';

var course = async (server) => {
    server.get('/item/:course_id', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    course_id: { type: 'string' },
                },
                required: ['course_id'],
            },
        },
    }, getCourse);
};

export { course as default };
