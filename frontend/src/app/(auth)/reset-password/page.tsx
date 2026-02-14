'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { KeyRound, ArrowLeft, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    if (!token) {
        return (
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Invalid Link</h2>
                <p className="text-muted">This password reset link is invalid or missing a token.</p>
                <Link href="/forgot-password" className="text-accent hover:underline">Request a new link</Link>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
        }

        setStatus('submitting');
        setErrorMessage('');

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Failed to reset password');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="w-full max-w-md text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-serif font-bold">Password Reset!</h2>
                <p className="text-muted">
                    Your password has been successfully updated. Redirecting to login...
                </p>
                <div className="pt-4">
                    <Link href="/login" className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-all inline-block">
                        Login Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <Link href="/login" className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                </Link>
                <h2 className="text-3xl font-serif font-bold">Set New Password</h2>
                <p className="mt-2 text-muted">
                    Please enter your new password below.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border border-muted/20 shadow-sm">
                {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errorMessage}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <KeyRound className="h-5 w-5 text-muted" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10 w-full bg-muted/5 border border-muted/20 rounded-lg py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            placeholder="Min 6 characters"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-foreground"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <KeyRound className="h-5 w-5 text-muted" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 w-full bg-muted/5 border border-muted/20 rounded-lg py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            placeholder="Confirm password"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-background bg-foreground hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 transition-all items-center gap-2"
                >
                    {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
                    {status === 'submitting' ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordContent />
            </Suspense>
        </div>
    );
}
