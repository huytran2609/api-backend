import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import { EError } from '~constants/code';
import jwt from 'jsonwebtoken';
import { UserJwt } from '~types/auth';



export function verifyAccessToken(request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) {
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
  jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as string, (error, user: UserJwt) => {
    if (error) {
      reply.code(403).send(EError.TOKEN_IS_INVALID);

      return;
    } else {
      request.user = user;
      done();
    }
  });
}
export function verifyRefreshToken(
  request: FastifyRequest<{ Body: { refreshToken: string } }>,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  const refreshToken = request.body.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) {
    reply.code(401).send(EError.REQUIRE_RELOGIN);
    return;
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY as string, async (error, user: UserJwt) => {
    if (error) {
      console.log(error);
      reply.code(401).send(EError.JWT_IS_INVALID);
      return;
    } else {
      request.user = user;
      done();
    }
  });
}
