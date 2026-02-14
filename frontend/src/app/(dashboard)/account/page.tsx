'use client';

import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, CreditCard, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Welcome back, {user.name.split(' ')[0]}</h1>
                <p className="text-muted text-sm mt-1">Manage your account and view your purchases.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
                <Link
                    href="/account/purchases"
                    className="p-6 rounded-xl border border-muted/50 bg-background hover:bg-muted/30 transition-all group"
                >
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ShoppingBag className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium">My Orders</h3>
                    <p className="text-sm text-muted mt-1">View order history and receipts</p>
                </Link>

                <Link
                    href="/wishlist"
                    className="p-6 rounded-xl border border-muted/50 bg-background hover:bg-muted/30 transition-all group"
                >
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Heart className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium">Saved Items</h3>
                    <p className="text-sm text-muted mt-1">Artworks you've favorited</p>
                </Link>

                <div className="p-6 rounded-xl border border-muted/50 bg-background/50 opacity-60 cursor-not-allowed">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
                        <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium">Payment Methods</h3>
                    <p className="text-sm text-muted mt-1">Manage saved cards</p>
                </div>
            </div>

            <div className="p-6 rounded-xl bg-muted/20 border border-muted/50 relative">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="font-medium">Account Details</h2>
                    <Link href="/settings" className="text-xs font-medium text-accent hover:underline">
                        Edit Profile
                    </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-6 text-sm">
                    <div>
                        <p className="text-muted mb-1">Full Name</p>
                        <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                        <p className="text-muted mb-1">Email Address</p>
                        <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-muted mb-1">Account Type</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 text-xs font-medium">
                            {user.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
