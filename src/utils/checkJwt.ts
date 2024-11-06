import jwt from 'jsonwebtoken';

export const checkJwt = (accessToken: string) => {
  return new Promise<{
    _id: string;
    username: string;
    role: string;
    iat: number;
    exp: number;
  }>((resolve, reject) => {
    if (!accessToken) {
      reject(new Error('not have access token'));
    }
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
      if (error) {
        reject(error);
      }
      resolve(user as any);
    });
  });
};
