/**
 * Auth Service
 * Centralized logic for authentication API calls.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authService = {
    /**
     * Register a new user
     */
    async register(data: any) {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return response.json();
    },

    /**
     * Login a user
     */
    async login(credentials: any) {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });
        return response.json();
    },

    /**
     * Logout the current user
     */
    async logout() {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        return response.json();
    },

    /**
     * Get current session/user info
     */
    async getMe() {
        const response = await fetch(`${API_URL}/api/auth/me`, {
            credentials: 'include',
        });
        return response.json();
    }
};
