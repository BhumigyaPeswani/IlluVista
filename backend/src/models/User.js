const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            maxlength: [60, 'Name cannot be more than 60 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                'Please provide a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false,
        },
        role: {
            type: String,
            enum: ['ADMIN', 'ARTIST', 'BUYER'],
            default: 'BUYER',
        },
        profileImage: {
            type: String,
            default: '',
        },
        refreshTokens: [{
            token: { type: String, required: true },
            createdAt: { type: Date, default: Date.now, expires: '7d' } // Auto-delete after 7 days
        }],
        passwordResetToken: String,
        passwordResetExpires: Date,

        // Email Verification
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: String,

        // SaaS & Subscriptions
        stripeCustomerId: String,
        subscription: {
            plan: {
                type: String,
                enum: ['FREE', 'PRO'],
                default: 'FREE',
            },
            status: {
                type: String,
                enum: ['active', 'canceled', 'past_due', 'incomplete', 'trialing'],
                default: 'active', // Free plan is always active
            },
            currentPeriodEnd: Date,
            stripeSubscriptionId: String,
        },

        // Marketplace Wallet (Managed Payouts)
        wallet: {
            balance: { type: Number, default: 0 }, // Available to withdraw
            pending: { type: Number, default: 0 }, // In clearing
            currency: { type: String, default: 'USD' },
        },

        loginAttempts: { type: Number, default: 0 },
        lockUntil: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
