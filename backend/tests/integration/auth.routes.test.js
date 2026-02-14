const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('../../src/routes/auth.routes');
const { errorHandler } = require('../../src/middleware/errorHandler');

// Setup Express App for Testing
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use(errorHandler); // Ensure error handler is used

// Database Connection (Handled by setup.js via MongoMemoryServer)
// but we need to ensure models are compiled
require('../../src/models/User');

describe('Auth Routes Integration', () => {

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Integration User',
                    email: 'integration@example.com',
                    password: 'password123',
                    role: 'ARTIST'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.user).toHaveProperty('email', 'integration@example.com');
            expect(res.body.data).toHaveProperty('accessToken');
        });

        it('should fail validation for invalid email', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Bad User',
                    email: 'not-an-email',
                    password: 'password123'
                });

            // Depends on zod/validate middleware response structure
            // Usually 400
            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Seed a user
            await request(app).post('/api/auth/register').send({
                name: 'Login User',
                email: 'login@example.com',
                password: 'password123'
            });
        });

        it('should login with correct credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.headers['set-cookie']).toBeDefined(); // Refresh token cookie
        });

        it('should reject incorrect password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toBe(401);
        });
    });
});
