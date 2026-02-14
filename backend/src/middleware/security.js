const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests, please try again later.' }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minute window
    max: 20, // increased limit for dev
    message: { success: false, error: 'Too many login attempts, please try again later' }
});


module.exports = {
    helmet,
    limiter,
    authLimiter
};
