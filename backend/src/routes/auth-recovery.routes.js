const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { z } = require('zod');
const User = require('../models/User');
const { hashPassword } = require('../lib/password');
const { sendPasswordResetEmail, sendVerificationEmail } = require('../lib/email');
const { validate } = require('../middleware/validate');

// --- Zod Schemas ---
const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Token is required'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100),
});

const verifyEmailSchema = z.object({
    token: z.string().min(1, 'Token is required'),
});

// --- Routes ---

// POST /api/auth/forgot-password
router.post('/forgot-password', validate(forgotPasswordSchema), async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            // Security: Don't reveal if user exists
            return res.status(200).json({ success: true, message: 'If an account exists, a reset email has been sent.' });
        }

        // Generate Reset Token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.passwordResetToken = passwordResetToken;
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // Send Email
        await sendPasswordResetEmail(user, resetToken);

        return res.status(200).json({ success: true, message: 'If an account exists, a reset email has been sent.' });
    } catch (error) {
        next(error);
    }
});

// POST /api/auth/reset-password
router.post('/reset-password', validate(resetPasswordSchema), async (req, res, next) => {
    try {
        const { token, password } = req.body;

        // Hash token to compare with DB
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Token is invalid or has expired' });
        }

        // Update Password
        user.password = await hashPassword(password);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        // Optional: clear sessions on password reset
        // user.refreshTokens = []; 
        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successful. Please login.' });
    } catch (error) {
        next(error);
    }
});

// POST /api/auth/send-verification-email (Protected? Or Public if passing email?)
// Usually public if re-requesting, or protected if logged in but unverified.
// Let's make it accept email for public re-send.
router.post('/send-verification-email', validate(forgotPasswordSchema), async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({ success: true, message: 'Verification email sent if account exists.' });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ success: false, error: 'Email already verified.' });
        }

        // Generate Verification Token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

        user.emailVerificationToken = hashedToken;
        await user.save();

        await sendVerificationEmail(user, verificationToken);

        return res.status(200).json({ success: true, message: 'Verification email sent if account exists.' });
    } catch (error) {
        next(error);
    }
});

// POST /api/auth/verify-email
router.post('/verify-email', validate(verifyEmailSchema), async (req, res, next) => {
    try {
        const { token } = req.body;
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            emailVerificationToken: hashedToken,
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid or expired verification token' });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        await user.save();

        return res.status(200).json({ success: true, message: 'Email verified successfully.' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
