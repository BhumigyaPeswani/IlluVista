const { SignJWT, jwtVerify } = require('jose');

const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-change-this-in-env';
const key = new TextEncoder().encode(secretKey);

/**
 * Create a signed JWT token
 */
async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(key);
}

/**
 * Verify and decode a JWT token
 */
async function decrypt(input) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
}

module.exports = { encrypt, decrypt };
