const { SignJWT, jwtVerify } = require('jose');
const crypto = require('crypto');

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-at-least-32-chars-long');
const ACCESS_TOKEN_EXPIRY = '15m'; // Short lived
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

/**
 * Generates a short-lived Access Token (JWT)
 */
async function generateAccessToken(user) {
    return await new SignJWT({
        userId: user._id.toString(), // Ensure string for JWT
        email: user.email,
        role: user.role,
        type: 'access'
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(ACCESS_TOKEN_EXPIRY)
        .sign(SECRET_KEY);
}

/**
 * Generates a long-lived Refresh Token (Opaque or JWT)
 * We'll use a random string for database storage to allow revocation
 */
function generateRefreshToken() {
    return {
        token: crypto.randomBytes(40).toString('hex'),
        expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
    };
}

/**
 * Verifies the JWT Access Token
 */
async function verifyAccessToken(token) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        if (payload.type !== 'access') {return null;}
        return payload;
    } catch (error) {
        return null; // Expired or invalid
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    REFRESH_TOKEN_EXPIRY_DAYS
};
