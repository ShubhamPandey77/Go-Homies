const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Secret = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, Secret, { expiresIn: '7d' });
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, Secret);
    } catch (error) {
        return null;
    }
}

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = { setUser, getUser, hashPassword, comparePassword };