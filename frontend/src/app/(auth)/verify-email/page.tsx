'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            return;
        }

        const verifyEmail = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${API_URL}/api/auth/verify-email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                });

                if (res.ok) {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error('Verification failed:', error);
                setStatus('error');
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="w-full max-w-md text-center space-y-6">
            {status === 'verifying' && (
                <>
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Loader2 className="w-8 h-8 text-accent animate-spin" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold">Verifying your email</h2>
                    <p className="text-muted">
                        Please wait while we verify your email address...
                    </p>
                </>
            )}

            {status === 'success' && (
                <>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold">Email Verified!</h2>
                    <p className="text-muted">
                        Your email has been successfully verified. You can now access all features of IlluVista.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/login"
                            className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-all inline-block"
                        >
                            Continue to Login
                        </Link>
                    </div>
                </>
            )}

            {status === 'error' && (
                <>
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold">Verification Failed</h2>
                    <p className="text-muted">
                        The verification link is invalid or has expired. Please request a new one.
                    </p>
                    <div className="pt-4">
                        <Link href="/register" className="text-accent hover:underline">
                            Back to Registration
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}
