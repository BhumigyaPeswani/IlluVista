const nodemailer = require('nodemailer');

const createTransporter = async () => {
    // Production: Use real SMTP
    if (process.env.SMTP_HOST) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    // Development: Use Ethereal (Mock)
    console.log('Using Ethereal (Mock) Email Service');
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
};

const sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = await createTransporter();
        const info = await transporter.sendMail({
            from: '"IlluVista " <noreply@illuvista.com>',
            to,
            subject,
            html,
        });

        console.log(`Email sent: ${info.messageId}`);
        // If using Ethereal, log the preview URL
        if (nodemailer.getTestMessageUrl(info)) {
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        }
        return info;
    } catch (error) {
        console.error('Email sending failed:', error);
        // Don't throw to avoid crashing auth flow, just log
        return null;
    }
};

const sendPasswordResetEmail = async (user, token) => {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    const html = `
        <h1>Reset Your Password</h1>
        <p>You requested a password reset. Click the link below to set a new password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
    `;
    return sendEmail({ to: user.email, subject: 'Password Reset Request', html });
};

const sendVerificationEmail = async (user, token) => {
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
    const html = `
        <h1>Verify Your Email</h1>
        <p>Welcome to IlluVista! Please click the link below to verify your email address:</p>
        <a href="${verifyUrl}">Verify Email</a>
    `;
    return sendEmail({ to: user.email, subject: 'Verify Your Email', html });
};

module.exports = { sendEmail, sendPasswordResetEmail, sendVerificationEmail };
