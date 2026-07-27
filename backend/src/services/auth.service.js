const User = require('../models/User');
const { hashPassword, comparePassword } = require('../lib/password');
const { generateAccessToken, generateRefreshToken, verifyAccessToken } = require('../lib/token');
const crypto = require('crypto');

class AuthService {
    async register({ name, email, password, role }) {
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'BUYER',
        });

        const accessToken = await generateAccessToken(user);
        const refreshToken = generateRefreshToken();

        user.refreshTokens.push(refreshToken);
        await user.save();

        return { user, accessToken, refreshToken };
    }

    async login({ email, password }) {
        const user = await User.findOne({ email }).select('+password +loginAttempts +lockUntil');
        if (!user) {
            throw new Error('Invalid credentials');
        }

        if (user.lockUntil && user.lockUntil > Date.now()) {
            throw new Error('Account temporarily locked. Please try again later.');
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.lockUntil = Date.now() + 60 * 60 * 1000;
            }
            await user.save();
            throw new Error('Invalid credentials');
        }

        user.loginAttempts = 0;
        user.lockUntil = undefined;

        const accessToken = await generateAccessToken(user);
        const refreshToken = generateRefreshToken();

        user.refreshTokens = user.refreshTokens.slice(-4); // Keep last 5
        user.refreshTokens.push(refreshToken);
        await user.save();

        return { user, accessToken, refreshToken };
    }

    async googleLogin(user) {
        const accessToken = await generateAccessToken(user);
        const refreshToken = generateRefreshToken();

        user.refreshTokens = user.refreshTokens.slice(-4);
        user.refreshTokens.push(refreshToken);
        await user.save();

        return { user, accessToken, refreshToken };
    }

    async refreshToken(requestToken) {
        if (!requestToken) {throw new Error('Refresh token required');}

        const user = await User.findOne({ 'refreshTokens.token': requestToken });

        if (!user) {
            throw new Error('Invalid or expired refresh token');
        }

        const newRefreshToken = generateRefreshToken();

        // Remove old token and add new one
        user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== requestToken);
        user.refreshTokens.push(newRefreshToken);

        // Limit number of refresh tokens
        if (user.refreshTokens.length > 5) {
            user.refreshTokens = user.refreshTokens.slice(-5);
        }

        await user.save();

        const accessToken = await generateAccessToken(user);

        return { accessToken, newRefreshToken };
    }

    async logout(refreshToken) {
        if (refreshToken) {
            await User.findOneAndUpdate(
                { 'refreshTokens.token': refreshToken },
                { $pull: { refreshTokens: { token: refreshToken } } }
            );
        }
    }

    async getMe(token) {
        if (!token) {return null;}
        const payload = await verifyAccessToken(token);
        if (!payload) {return null;}
        return User.findById(payload.userId);
    }
}

module.exports = new AuthService();
