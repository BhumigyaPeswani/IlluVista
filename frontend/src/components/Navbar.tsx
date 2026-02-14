'use client';

import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X, LogOut, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { UserRole } from '@/types';
import { useState } from 'react';

export default function Navbar() {
    const { items, toggleCart } = useCart();
    const { items: wishlistItems } = useWishlist();
    const { user, logout } = useAuth();
    const itemCount = items.length;
    const wishlistCount = wishlistItems.length;
    const [mobileOpen, setMobileOpen] = useState(false);

    const getDashboardLink = (role: UserRole): string => {
        switch (role) {
            case 'ADMIN': return '/admin';
            case 'ARTIST': return '/dashboard';
            case 'BUYER': return '/account';
            default: return '/account';
        }
    };

    const getDashboardLabel = (role: UserRole): string => {
        switch (role) {
            case 'ADMIN': return 'Admin Panel';
            case 'ARTIST': return 'Studio';
            default: return 'Account';
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-muted/20">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
                    IlluVista
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/gallery" className="text-sm font-medium hover:text-accent transition-colors">
                        Gallery
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6">
                    {user ? (
                        <div className="relative group">
                            <Link
                                href={getDashboardLink(user.role)}
                                className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors py-2"
                            >
                                {user.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt={user.name}
                                        className="w-7 h-7 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                                        {user.name?.[0] || '?'}
                                    </div>
                                )}
                                <span className="hidden sm:inline font-medium">{user.name}</span>
                            </Link>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                                <div className="bg-background border border-muted/20 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm">
                                    <div className="px-4 py-3 border-b border-muted/20 bg-muted/5">
                                        <p className="text-sm font-medium truncate">{user.name}</p>
                                        <p className="text-xs text-muted truncate">{user.email}</p>
                                    </div>
                                    <div className="p-1">
                                        <Link
                                            href={getDashboardLink(user.role)}
                                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 rounded-lg transition-colors"
                                        >
                                            <User className="w-4 h-4" />
                                            {getDashboardLabel(user.role)}
                                        </Link>
                                        <button
                                            onClick={() => logout()}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" className="hover:text-accent transition-colors">
                            <User className="w-5 h-5" />
                        </Link>
                    )}

                    <Link href="/wishlist" className="hover:text-accent transition-colors relative">
                        <Heart className="w-5 h-5" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent text-white text-[10px] items-center justify-center">
                                    {wishlistCount}
                                </span>
                            </span>
                        )}
                    </Link>

                    <button onClick={toggleCart} className="hover:text-accent transition-colors relative" suppressHydrationWarning>
                        <ShoppingBag className="w-5 h-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent text-white text-[10px] items-center justify-center">
                                    {itemCount}
                                </span>
                            </span>
                        )}
                    </button>

                    {/* Mobile menu toggle */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden hover:text-accent transition-colors" suppressHydrationWarning>
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileOpen && (
                <div className="md:hidden bg-background border-t border-muted/20 px-6 py-4 space-y-3">
                    <Link href="/gallery" onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-2 hover:text-accent">
                        Gallery
                    </Link>
                    <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-2 hover:text-accent">
                        Wishlist ({wishlistCount})
                    </Link>
                    {user ? (
                        <Link href={getDashboardLink(user.role)} onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-2 hover:text-accent">
                            {getDashboardLabel(user.role)}
                        </Link>
                    ) : (
                        <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-2 hover:text-accent">
                            Sign In
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
