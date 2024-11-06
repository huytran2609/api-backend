import { EError } from '../../constants/code.js';
import jwt from 'jsonwebtoken';

function verifyAccessToken(request, reply, done) {
    const token = request.headers.authorization;
    if (!token) {
        reply.code(401).send(EError.REQUIRE_RELOGIN);
        return;
    }
    const accessToken = token.split(' ')[1];
    if (!accessToken) {
        reply.code(401).send(EError.REQUIRE_RELOGIN);
        return;
    }
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
        if (error) {
            reply.code(403).send(EError.TOKEN_IS_INVALID);
            return;
        }
        else {
            request.user = user;
            done();
        }
    });
}

export { verifyAccessToken };
