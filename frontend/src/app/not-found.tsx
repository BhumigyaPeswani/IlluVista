import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <h1 className="text-8xl font-serif font-bold text-muted/20 mb-4">404</h1>
                <h2 className="text-2xl font-serif font-medium mb-3">Page Not Found</h2>
                <p className="text-muted text-sm mb-8 leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-foreground text-background text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all rounded-md"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/gallery"
                        className="px-6 py-3 border border-muted/30 text-sm uppercase tracking-widest hover:border-accent hover:text-accent transition-all rounded-md"
                    >
                        Browse Gallery
                    </Link>
                </div>
            </div>
        </div>
    );
}
