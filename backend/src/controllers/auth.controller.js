const AuthService = require('../services/auth.service');
const ApiResponse = require('../utils/response');

const REFRESH_TOKEN_EXPIRY_DAYS = 7;

const setRefreshTokenCookie = (res, token) => {
    res.cookie('refresh-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
        path: '/api/auth/refresh-token'
    });
};

class AuthController {
    async register(req, res, next) {
        try {
            const { user, accessToken, refreshToken } = await AuthService.register(req.body);
            setRefreshTokenCookie(res, refreshToken.token);
            return ApiResponse.created(res, {
                accessToken,
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            }, 'User registered successfully');
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            console.log('Login attempt:', req.body.email); // Debug log
            const { user, accessToken, refreshToken } = await AuthService.login(req.body);
            setRefreshTokenCookie(res, refreshToken.token);
            return ApiResponse.success(res, {
                accessToken,
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            }, 'Login successful');
        } catch (error) {
            console.error('Login error in controller:', error.message); // Debug log
            // Map specific errors to 401/429 if needed, or let global handler do it
            if (error.message === 'Invalid credentials') {
                return ApiResponse.error(res, error.message, 401);
            }
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const requestToken = req.cookies['refresh-token'];
            const { accessToken, newRefreshToken } = await AuthService.refreshToken(requestToken);
            setRefreshTokenCookie(res, newRefreshToken.token);
            return ApiResponse.success(res, { accessToken });
        } catch (error) {
            if (error.message === 'Invalid or expired refresh token') {
                res.clearCookie('refresh-token', { path: '/api/auth/refresh-token' });
                return ApiResponse.error(res, error.message, 403);
            }
            next(error);
        }
    }

    async me(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            const user = await AuthService.getMe(token);

            if (!user) {
                return ApiResponse.success(res, { user: null });
            }

            return ApiResponse.success(res, {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    profileImage: user.profileImage
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies['refresh-token'];
            await AuthService.logout(refreshToken);
            res.clearCookie('refresh-token', { path: '/api/auth/refresh-token' });
            return ApiResponse.success(res, null, 'Logged out successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
