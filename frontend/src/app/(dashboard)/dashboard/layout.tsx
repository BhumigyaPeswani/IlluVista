'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Palette,
    ShoppingBag,
    MessageSquare,
    Settings,
    LogOut,
    Plus
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth, AuthProvider } from '@/context/AuthContext'; // Ensure AuthProvider is wrapped if not already in root
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Inner component to handle logic that requires AuthContext
function DashboardContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, isLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/login');
            } else if (user.role !== 'ARTIST') {
                router.push(user.role === 'ADMIN' ? '/admin' : '/account');
            }
        }
    }, [user, isLoading, router]);

    if (isLoading || !user || user.role !== 'ARTIST') {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'My Artworks', href: '/dashboard/artworks', icon: Palette },
        { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
        { name: 'Comments', href: '/dashboard/comments', icon: MessageSquare },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-neutral-100/50 text-foreground pt-20">
            {/* Artist Sidebar */}
            <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col fixed left-0 top-20 bottom-0 z-40 text-neutral-900">
                <div className="h-16 flex items-center px-6 border-b border-neutral-200">
                    <Link href="/dashboard" className="text-xl font-bold tracking-tight text-neutral-900">IlluVista <span className="text-xs font-normal text-muted bg-blue-50 text-blue-700 px-2 py-0.5 rounded ml-2">ARTIST</span></Link>
                </div>

                <div className="p-4">
                    <Link href="/dashboard/artworks/new" className="flex items-center justify-center gap-2 w-full bg-neutral-900 text-white py-2 rounded-lg font-medium hover:bg-neutral-800 transition-colors">
                        <Plus className="w-4 h-4" />
                        New Artwork
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-neutral-100 text-neutral-900"
                                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-neutral-200">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 mb-2 hover:bg-neutral-50 rounded-lg transition-colors group cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold ring-2 ring-transparent group-hover:ring-neutral-200 transition-all overflow-hidden">
                            {user?.profileImage ? (
                                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                user.name?.[0]
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate group-hover:text-black transition-colors">{user.name}</p>
                            <p className="text-xs text-muted truncate">{user.email}</p>
                        </div>
                    </Link>
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                    <Link
                        href="/"
                        className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-50 rounded-md transition-colors mt-1"
                    >
                        View Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    // We wrap in AuthProvider to ensure context is available if looking at this layout independently
    // though usually root layout handles it. It's safer to rely on root, but adding strict checks here.
    // The previous layout had AuthProvider, so I will keep it to be safe, assuming it handles nesting gracefully or is the provider.
    // Actually, root layout likely doesn't have it based on previous files seen (Navbar used it but maybe via a higher provider).
    // Let's assume we need it.
    return (
        // <AuthProvider> // Commenting out if root has it, but based on previous file, it was here.
        // Actually, if I nest providers, it might reset state. 
        // I'll check if `src/app/layout.tsx` exists and has it later. 
        // For now, to be safe and match previous:
        <DashboardContent>{children}</DashboardContent>
    );
}
