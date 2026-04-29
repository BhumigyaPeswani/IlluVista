'use client';

import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Check, User, Palette } from 'lucide-react';
import clsx from 'clsx';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function RegisterPage() {
    const { login, isLoading } = useAuth();
    const [role, setRole] = useState<UserRole>('BUYER');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters.');
            setSubmitting(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, role }),
                credentials: 'include',
            });

            const responseData = await res.json();
            const { data } = responseData; // Extract data object

            if (res.ok) {
                login(data.accessToken, data.user);
                if (role === 'ADMIN') router.push('/admin');
                else if (role === 'ARTIST') router.push('/dashboard');
                else router.push('/account');
            } else {
                setError(responseData.error || 'Registration failed.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const isDisabled = isLoading || submitting;

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/10 px-4 py-12">
            <div className="bg-background p-8 rounded-xl shadow-xl max-w-md w-full border border-muted/20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">Join IlluVista</h1>
                    <p className="text-muted text-sm">Create an account to start your journey.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    {/* Role Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setRole('BUYER')}
                            className={clsx(
                                "p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-all relative",
                                role === 'BUYER'
                                    ? "border-accent bg-accent/5 text-accent"
                                    : "border-muted/20 hover:border-muted/50 text-muted hover:text-foreground"
                            )}
                        >
                            <User className="w-6 h-6" />
                            <span className="text-sm font-medium">Collector</span>
                            {role === 'BUYER' && <Check className="w-4 h-4 text-accent absolute top-2 right-2" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('ARTIST')}
                            className={clsx(
                                "p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-all relative",
                                role === 'ARTIST'
                                    ? "border-accent bg-accent/5 text-accent"
                                    : "border-muted/20 hover:border-muted/50 text-muted hover:text-foreground"
                            )}
                        >
                            <Palette className="w-6 h-6" />
                            <span className="text-sm font-medium">Artist</span>
                            {role === 'ARTIST' && <Check className="w-4 h-4 text-accent absolute top-2 right-2" />}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs uppercase tracking-wider text-muted font-medium mb-1 block">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-muted/5 border border-muted/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-wider text-muted font-medium mb-1 block">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-muted/5 border border-muted/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-wider text-muted font-medium mb-1 block">Password</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full bg-muted/5 border border-muted/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Min 6 characters"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-600 text-xs text-center">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isDisabled}
                        className="w-full bg-foreground text-background py-4 text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50 mt-4 rounded-md"
                    >
                        {isDisabled ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 flex items-center gap-4">
                    <div className="h-px bg-muted/20 flex-1"></div>
                    <span className="text-xs text-muted uppercase">Or</span>
                    <div className="h-px bg-muted/20 flex-1"></div>
                </div>

                <button
                    onClick={() => {
                        window.location.href = `${API_URL}/api/auth/google?role=${role}`;
                    }}
                    type="button"
                    className="w-full mt-6 bg-white border border-muted/20 text-black py-4 text-sm uppercase tracking-widest hover:bg-muted/5 transition-all duration-300 rounded-md flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>

                <div className="mt-6 text-center text-sm text-muted">
                    Already have an account?{' '}
                    <Link href="/login" className="text-foreground font-medium hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
