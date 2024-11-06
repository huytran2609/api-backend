import { all } from '../../controllers/admin/user/index.js';

var user = async (server) => {
    server.get('/all', all);
};

export { user as default };
