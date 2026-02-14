'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="text-6xl mb-4 opacity-20">⚠️</div>
                <h2 className="text-2xl font-serif font-medium mb-3">Something went wrong</h2>
                <p className="text-muted text-sm mb-6 leading-relaxed">
                    An unexpected error occurred. Our team has been notified.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-foreground text-background text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all rounded-md"
                    >
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="px-6 py-3 border border-muted/30 text-sm uppercase tracking-widest hover:border-accent hover:text-accent transition-all rounded-md"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
