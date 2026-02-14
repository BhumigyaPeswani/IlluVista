'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Palette,
    ShoppingBag,
    Settings,
    LogOut
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, isLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/login');
            } else if (user.role !== 'ADMIN') {
                router.push('/dashboard'); // Redirect non-admins
            }
        }
    }, [user, isLoading, router]);

    if (isLoading || !user || user.role !== 'ADMIN') {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Artworks', href: '/admin/artworks', icon: Palette },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-neutral-100/50">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col fixed inset-y-0 z-50">
                <div className="h-16 flex items-center px-6 border-b border-neutral-200">
                    <Link href="/admin" className="text-xl font-bold tracking-tight">IlluVista <span className="text-xs font-normal text-muted bg-muted/10 px-2 py-0.5 rounded ml-2">ADMIN</span></Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-neutral-900 text-white"
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
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                            {user.name[0]}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-muted truncate">{user.email}</p>
                        </div>
                    </div>
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
