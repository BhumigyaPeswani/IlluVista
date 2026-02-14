const AuthService = require('../../src/services/auth.service');
const User = require('../../src/models/User');
const { generateAccessToken, generateRefreshToken } = require('../../src/lib/token');
const { hashPassword, comparePassword } = require('../../src/lib/password');

jest.mock('../../src/models/User');
jest.mock('../../src/lib/token');
jest.mock('../../src/lib/password');

describe('AuthService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user successfully', async () => {
            const mockUser = {
                _id: 'user123',
                name: 'Test User',
                email: 'test@example.com',
                role: 'BUYER',
                refreshTokens: [],
                save: jest.fn(),
            };

            User.findOne.mockResolvedValue(null);
            hashPassword.mockResolvedValue('hashedPassword');
            User.create.mockResolvedValue(mockUser);
            generateAccessToken.mockResolvedValue('accessToken');
            generateRefreshToken.mockReturnValue({ token: 'refreshToken' });

            const result = await AuthService.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });

            expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(hashPassword).toHaveBeenCalledWith('password123');
            expect(User.create).toHaveBeenCalled();
            expect(result).toHaveProperty('accessToken', 'accessToken');
            expect(result.user).toEqual(mockUser);
        });

        it('should throw error if user already exists', async () => {
            User.findOne.mockResolvedValue({ _id: 'existingUser' });

            await expect(AuthService.register({
                name: 'Test User',
                email: 'existing@example.com',
                password: 'password123',
            })).rejects.toThrow('User already exists');
        });
    });

    describe('login', () => {
        it('should login user successfully', async () => {
            const mockUser = {
                _id: 'user123',
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashedPassword',
                role: 'BUYER',
                refreshTokens: [],
                loginAttempts: 0,
                save: jest.fn(),
            };

            // Chain mock for select('+password...')
            const mockQuery = {
                select: jest.fn().mockResolvedValue(mockUser)
            };
            User.findOne.mockReturnValue(mockQuery);

            comparePassword.mockResolvedValue(true);
            generateAccessToken.mockResolvedValue('accessToken');
            generateRefreshToken.mockReturnValue({ token: 'refreshToken' });

            const result = await AuthService.login({
                email: 'test@example.com',
                password: 'password123',
            });

            expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(comparePassword).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(result).toHaveProperty('accessToken', 'accessToken');
        });
    });
});
