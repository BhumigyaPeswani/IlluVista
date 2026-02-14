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
