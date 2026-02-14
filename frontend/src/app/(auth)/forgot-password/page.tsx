'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            // We always show success for security reasons (unless network error)
            if (res.ok || res.status === 200 || res.status === 404) {
                setStatus('success');
            } else {
                console.error('Forgot password failed');
                setStatus('success'); // Still show success to prevent enumeration
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            setStatus('success'); // Fail open for UX/Security balance
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="w-full max-w-md text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold">Check your email</h2>
                    <p className="text-muted">
                        We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>.
                    </p>
                    <div className="pt-4">
                        <Link href="/login" className="text-accent hover:underline flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link href="/login" className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                    </Link>
                    <h2 className="text-3xl font-serif font-bold">Reset Password</h2>
                    <p className="mt-2 text-muted">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border border-muted/20 shadow-sm">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-muted" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 w-full bg-muted/5 border border-muted/20 rounded-lg py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-background bg-foreground hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 transition-all"
                    >
                        {status === 'submitting' ? 'Sending Link...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}
