'use client';

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        const loginEmail = email;
        const loginPassword = password;

        if (!loginEmail || !loginPassword) {
            setError('Please enter both email and password.');
            setSubmitting(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
                credentials: 'include',
            });

            const responseData = await res.json();
            const { data } = responseData; // Extract data object

            if (res.ok) {
                console.log('Login success:', data); // Debug log
                login(data.accessToken, data.user);
                if (data.user.role === 'ADMIN') router.push('/admin');
                else if (data.user.role === 'ARTIST') router.push('/dashboard');
                else router.push('/');
            } else {
                console.error('Login failed response:', responseData); // Debug log
                setError(responseData.error || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Login exception:', err); // Debug log
            setError('An error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };



    const isDisabled = isLoading || submitting;

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/10 px-4 py-12">
            <div className="bg-background p-8 rounded-xl shadow-xl max-w-md w-full border border-muted/20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">Sign In</h1>
                    <p className="text-muted text-sm">Welcome back to IlluVista.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 mb-4">
                    <div>
                        <label className="text-xs uppercase tracking-wider text-muted font-medium mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full bg-muted/5 border border-muted/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-wider text-muted font-medium mb-1 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-muted/5 border border-muted/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isDisabled}
                        className="w-full bg-foreground text-background py-3 text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50 rounded-md"
                    >
                        {isDisabled ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>



                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600 text-xs text-center">{error}</p>
                    </div>
                )}
                <div className="mt-4 flex items-center gap-4">
                    <div className="h-px bg-muted/20 flex-1"></div>
                    <span className="text-xs text-muted uppercase">Or</span>
                    <div className="h-px bg-muted/20 flex-1"></div>
                </div>

                <button
                    onClick={() => {
                        window.location.href = `${API_URL}/api/auth/google`;
                    }}
                    type="button"
                    className="w-full mt-4 bg-white border border-muted/20 text-black py-3 text-sm uppercase tracking-widest hover:bg-muted/5 transition-all duration-300 rounded-md flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign in with Google
                </button>

                <div className="mt-6 text-center text-sm text-muted">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-foreground font-medium hover:underline">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
}
