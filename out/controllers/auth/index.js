import bcrypt from 'bcrypt';
import { Token } from '../../models/Token.js';
import { User } from '../../models/User.js';
import { generateAccessToken, generateRefreshToken } from './utils.js';
import { ERole } from '../../types/index.js';

const register = async (request, reply) => {
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
const login = async (request, reply) => {
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

export { login, register };
