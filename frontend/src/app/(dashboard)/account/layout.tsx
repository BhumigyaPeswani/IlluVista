'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, ShoppingBag, Settings } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const navigation = [
        { name: 'Account Overview', href: '/account', icon: User },
        { name: 'Purchase History', href: '/account/purchases', icon: ShoppingBag },
        { name: 'Settings', href: '/account/settings', icon: Settings },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl mt-20">
            <div className="grid md:grid-cols-[240px,1fr] gap-8">
                {/* Account Sidebar */}
                <aside className="space-y-6">
                    <div className="p-6 bg-muted/30 rounded-xl border border-muted/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-lg text-accent font-bold overflow-hidden">
                                {user.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    user.name[0]
                                )}
                            </div>
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-muted truncate max-w-[120px]">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-neutral-900 text-white"
                                            : "text-muted hover:bg-muted/30 hover:text-foreground"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="min-h-[500px]">
                    {children}
                </main>
            </div>
        </div>
    );
}
