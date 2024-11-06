import { myRoadmap, getCoursesSimilarTag } from '../../controllers/roadmap/index.js';
import { verifyAccessToken } from '../../middlewares/auth/index.js';

var roadmap = async (server) => {
    server.addHook('preHandler', verifyAccessToken);
    server.get('/my_roadmap', myRoadmap);
    server.get('/courses_similar_tag', {
        schema: {
            querystring: { type: 'object', properties: { detail_id: { type: 'string' } }, required: ['detail_id'] },
        },
    }, getCoursesSimilarTag);
};

export { roadmap as default };
