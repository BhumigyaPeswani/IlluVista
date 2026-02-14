const bcrypt = require('bcryptjs');

/**
 * Hash a password using bcrypt
 */
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}

/**
 * Compare a plain text password with a hashed password
 */
async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

module.exports = { hashPassword, comparePassword };
