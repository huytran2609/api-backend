import jwt from 'jsonwebtoken';
import { IUser } from '~models/User';
import { UserJwt } from '~types/auth';

export const generateAccessToken = (user: IUser, expiresIn?: string | number | undefined) => {
  return jwt.sign(
    {
      _id: user._id.toString(),
      username: user.username,
      role: user.role,
      type: 'access',
    } as UserJwt,
    process.env.JWT_ACCESS_KEY as string,
    { expiresIn: expiresIn ?? '5d' },
  );
};
export const generateRefreshToken = (user: IUser) => {
  return jwt.sign(
    {
      _id: user._id.toString(),
      username: user.username,
      role: user.role,
      type: 'refresh',
    } as UserJwt,
    process.env.JWT_REFRESH_KEY as string,
    { expiresIn: '1w' },
  );
};
