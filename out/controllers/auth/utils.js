import jwt from 'jsonwebtoken';

const generateAccessToken = (user, expiresIn) => {
    return jwt.sign({
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
        type: 'access',
    }, process.env.JWT_ACCESS_KEY, { expiresIn: expiresIn ?? '5d' });
};
const generateRefreshToken = (user) => {
    return jwt.sign({
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
        type: 'refresh',
    }, process.env.JWT_REFRESH_KEY, { expiresIn: '1w' });
};

export { generateAccessToken, generateRefreshToken };
