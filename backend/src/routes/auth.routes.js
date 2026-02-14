const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const AuthController = require('../controllers/auth.controller');

// --- Zod Schemas ---
const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100),
    role: z.enum(['BUYER', 'ARTIST']).default('BUYER'),
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

// POST /api/auth/register
router.post('/register', validate(registerSchema), AuthController.register);

// POST /api/auth/login
router.post('/login', validate(loginSchema), AuthController.login);

// POST /api/auth/refresh-token
router.post('/refresh-token', AuthController.refreshToken);

// GET /api/auth/me
router.get('/me', AuthController.me);

// POST /api/auth/logout
router.post('/logout', AuthController.logout);

module.exports = router;
