import bcrypt from 'bcrypt';
import { Token } from '~models/Token';
import { IUser, User } from '~models/User';
import { generateAccessToken, generateRefreshToken } from './utils.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ERole } from '~types/index.js';

export const register = async (
  request: FastifyRequest<{
    Body: {
      username: string;
      email: string;
      password: string;
      fullname: string;
      phone?: string;
      biography?: string;
      birthday?: Date;
      facebook?: string;
      job?: string;
    };
  }>,
  reply: FastifyReply,
) => {
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;
  const fullname = request.body.fullname;
  const phone = request.body.phone;
  const biography = request.body.biography;
  const birthday = request.body.birthday;
  const facebook = request.body.facebook;
  const job = request.body.job;
  const role = ERole.STUDENT;

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashed,
    fullname,
    phone,
    biography,
    birthday,
    facebook,
    job,
    role,
  });
  const user = await newUser.save();

  await reply.code(200).send({ user: { ...user.toObject(), password: '' } });

  return;
};

export const login = async (
  request: FastifyRequest<{
    Body: {
      username: string;
      password: string;
    };
  }>,
  reply: FastifyReply,
) => {
  const username = request.body.username;
  const password = request.body.password;
  console.log(request.body?.username);
  if (!password) {
    await reply.code(403).send('Không đúng mật khẩu.');
    return;
  }
  const user = await User.findOne({ username: username });
  if (!user) {
    await reply.code(403).send('Không đúng tên đăng nhập.');
    return;
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    await reply.code(400).send('Sai mật khẩu.');
    return;
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await new Token({ data: refreshToken, user_id: user._id }).save();
  await reply.code(200).send({ user: { ...user.toObject(), password: '' }, accessToken, refreshToken });

  return;
};

export const refresh = async (request: FastifyRequest<{ Body: { refreshToken: string } }>, reply: FastifyReply) => {
  const refreshToken = request.body.refreshToken;
  const user = request.user;
  if (!user || !refreshToken) {
    await reply.code(401).send('Token không chính xác.');
    return;
  }

  const [refreshTokenData, userData] = await Promise.all([
    Token.findOne({ data: refreshToken }),
    User.findById(user._id),
  ]);
  if (!refreshTokenData) {
    await reply.code(401).send('Hết hạn phiên đăng nhập.');
    return;
  }
  const newAccessToken = generateAccessToken(userData as IUser);
  let newRefreshToken: any = undefined;
  await Promise.all([
    Token.findByIdAndRemove(refreshTokenData._id),
    (async () => {
      newRefreshToken = generateRefreshToken(userData as IUser);
      await new Token({ data: newRefreshToken, user_id: user._id }).save();
    })(),
  ]);
  await reply.code(200).send({ accessToken: newAccessToken, refreshToken: newRefreshToken });

  return;
};

export const auto = async (request: FastifyRequest<{ Body: { refreshToken: string } }>, reply: FastifyReply) => {
  const refreshToken = request.body.refreshToken;
  const user = request.user;
  if (!user || !refreshToken) {
    await reply.code(401).send('Token không chính xác.');
    return;
  }
  const [refreshTokenData, userData] = await Promise.all([
    Token.findOne({ data: refreshToken }),
    User.findOne({ _id: user._id, valid: true }),
  ]);
  if (!refreshTokenData) {
    await reply.code(401).send('Hết hạn phiên đăng nhập.');
    return;
  }
  const newAccessToken = generateAccessToken(userData as IUser);
  let newRefreshToken: any = undefined;
  await Promise.all([
    Token.findByIdAndRemove(refreshTokenData._id),
    (async () => {
      newRefreshToken = generateRefreshToken(userData as IUser);
      await new Token({ data: newRefreshToken, user_id: user._id }).save();
    })(),
  ]);

  await reply.code(200).send({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: { ...userData?.toObject(), password: '' },
  });

  return;
};

export const logout = async (request: FastifyRequest<{ Body: { refreshToken: string } }>, reply: FastifyReply) => {
  const refreshToken = request.body.refreshToken;
  await Promise.all([Token.deleteOne({ data: refreshToken })]);
  await reply.code(200).send('success');

  return;
};


