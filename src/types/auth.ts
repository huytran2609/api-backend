import { ERole } from '.';

export type UserJwt = {
  _id: string;
  username: string;
  role: ERole;
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
};
