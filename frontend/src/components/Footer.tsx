import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-background border-t border-muted/20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-2xl font-serif font-bold tracking-tight mb-4 block">
                            IlluVista
                        </Link>
                        <p className="text-muted text-sm leading-relaxed">
                            Curating the world's finest digital art experiences.
                            Immerse yourself in creativity.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-serif font-semibold mb-4">Discover</h3>
                        <ul className="space-y-2 text-sm text-muted">
                            <li><Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
                            <li><Link href="/artists" className="hover:text-accent transition-colors">Artists</Link></li>
                            <li><Link href="/collections" className="hover:text-accent transition-colors">Collections</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-serif font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted">
                            <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                            <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-serif font-semibold mb-4">Newsletter</h3>
                        <p className="text-sm text-muted mb-4">Subscribe for exhibition updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-card border border-muted/20 px-4 py-2 text-sm w-full focus:outline-none focus:border-accent"
                            />
                            <button className="bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-muted/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted">
                    <p>© {new Date().getFullYear()} IlluVista Gallery. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-foreground">Instagram</a>
                        <a href="#" className="hover:text-foreground">Twitter</a>
                        <a href="#" className="hover:text-foreground">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
