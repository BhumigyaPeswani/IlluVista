'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Search } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import ArtworkCard from '@/components/ArtworkCard';

export default function WishlistPage() {
    const { items } = useWishlist();

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">My Wishlist</h1>

                    <div className="flex flex-col items-center justify-center py-20 border border-dashed border-muted/30 rounded-2xl bg-muted/5">
                        <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mb-6">
                            <Heart className="w-8 h-8 text-muted" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold mb-2">Your wishlist is empty</h2>
                        <p className="text-muted mb-8 max-w-md text-center">
                            Save artworks you love to find them easily later.
                            Start exploring the gallery to build your collection.
                        </p>
                        <Link
                            href="/gallery"
                            className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-all flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" /> Explore Gallery
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold">My Wishlist</h1>
                        <p className="text-muted mt-2">{items.length} saved artworks</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((artwork) => (
                        <ArtworkCard key={artwork._id || artwork.id} artwork={artwork} />
                    ))}
                </div>
            </div>
        </div>
    );
}
