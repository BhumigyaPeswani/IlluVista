'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User) => void;
    logout: () => Promise<void>;
    isLoading: boolean;
    accessToken: string | null;
    fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Helper to refresh token
    const refreshAccessToken = useCallback(async (): Promise<string | null> => {
        try {
            const res = await fetch(`${API_URL}/api/auth/refresh-token`, {
                method: 'POST',
                credentials: 'include', // Send refresh cookie
            });

            if (res.ok) {
                const jsonData = await res.json();
                const newAccessToken = jsonData.data?.accessToken;
                
                if (!newAccessToken) {
                    setAccessToken(null);
                    setUser(null);
                    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    return null;
                }
                
                setAccessToken(newAccessToken);
                // Update cookie for middleware
                document.cookie = `auth-token=${newAccessToken}; path=/; max-age=86400; SameSite=Lax`;
                return newAccessToken;
            } else {
                // Refresh failed - clear session
                setAccessToken(null);
                setUser(null);
                // Clear cookie
                document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                return null;
            }
        } catch (error) {
            console.error('RefreshToken failed:', error);
            return null;
        }
    }, []);

    // Custom fetch wrapper that handles Bearer token & Refresh
    const fetchWithAuth = useCallback(async (url: string, options: RequestInit = {}) => {
        let token = accessToken;

        // Ensure headers object exists
        const headers = new Headers(options.headers);

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        let response = await fetch(url, { ...options, headers });

        // If 401, try to refresh
        if (response.status === 401) {
            token = await refreshAccessToken();
            if (token) {
                // Retry with new token
                headers.set('Authorization', `Bearer ${token}`);
                response = await fetch(url, { ...options, headers });
            } else {
                // Logout if refresh fails
                setUser(null);
                setAccessToken(null);
                document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                // Optional: redirect to login if strictly required
            }
        }

        return response;
    }, [accessToken, refreshAccessToken]);

    // Initial session check
    const checkSession = useCallback(async () => {
        try {
            // 1. Try to recover from cookie first (avoids unnecessary refresh)
            const cookieToken = document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
            let sessionRestored = false;

            if (cookieToken) {
                const res = await fetch(`${API_URL}/api/auth/me`, {
                    headers: { 'Authorization': `Bearer ${cookieToken}` },
                    credentials: 'include'
                });

                if (res.ok) {
                    const jsonData = await res.json();
                    setAccessToken(cookieToken);
                    setUser(jsonData.data.user);
                    sessionRestored = true;
                }
            }

            // 2. If cookie invalid or missing, try refresh token
            if (!sessionRestored) {
                const token = await refreshAccessToken();

                if (token) {
                    // Valid session, get user details using the token
                    const res = await fetch(`${API_URL}/api/auth/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (res.ok) {
                        const jsonData = await res.json();
                        setUser(jsonData.data.user);
                    }
                }
            }
        } catch (error) {
            console.error('Session check failed:', error);
        } finally {
            setIsLoading(false);
        }
    }, [refreshAccessToken]);

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    const login = (token: string, userData: User) => {
        setAccessToken(token);
        setUser(userData);
        // Set cookie for middleware
        document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Lax`;
    };

    const logout = async () => {
        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setAccessToken(null);
            setUser(null);
            // Clear cookie
            document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            router.push('/');
            router.refresh();
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            logout,
            isLoading,
            accessToken,
            fetchWithAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
