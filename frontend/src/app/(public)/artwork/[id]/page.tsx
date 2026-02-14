'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import WishlistButton from '@/components/WishlistButton';
import { Artwork, normalizeArtwork } from '@/types';
import LikeButton from '@/components/social/LikeButton';
import CommentSection from '@/components/social/CommentSection';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function ArtworkPage() {
    const params = useParams();
    const id = params?.id as string;
    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const res = await fetch(`${API_URL}/api/artworks/${id}`);
                if (!res.ok) {
                    setArtwork(null);
                    return;
                }
                const json = await res.json();
                setArtwork(normalizeArtwork(json.data));
            } catch (error) {
                console.error('Failed to fetch artwork:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchArtwork();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="aspect-[3/4] bg-muted/10 animate-pulse rounded-lg" />
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-muted/20 rounded w-1/3" />
                        <div className="h-12 bg-muted/20 rounded w-3/4" />
                        <div className="h-4 bg-muted/10 rounded w-full" />
                        <div className="h-4 bg-muted/10 rounded w-2/3" />
                    </div>
                </div>
            </div>
        );
    }

    if (!artwork) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 pb-24 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Visual Content */}
                <div className="relative aspect-[3/4] w-full bg-muted/10 rounded-lg overflow-hidden">
                    <Image
                        src={artwork.image || artwork.imageUrl || '/placeholder.jpg'}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Info Content */}
                <div>
                    <span className="text-sm uppercase tracking-widest text-muted block mb-4">
                        {artwork.category || artwork.medium}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                        {artwork.title}
                    </h1>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                            {artwork.artistName?.[0] || '?'}
                        </div>
                        <div>
                            <p className="font-medium">{artwork.artistName}</p>
                            <p className="text-xs text-muted">Artist</p>
                        </div>
                    </div>

                    <div className="prose prose-sm text-neutral-500 mb-10 leading-relaxed">
                        <p>{artwork.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-muted/20 pt-8 mt-8">
                        <div className="text-3xl font-serif font-bold">
                            ${artwork.price?.toLocaleString() ?? 'N/A'}
                        </div>
                        <LikeButton artworkId={artwork._id || artwork.id || ''} />
                    </div>
                    <div className="flex items-center gap-4 mt-8">
                        <WishlistButton
                            artwork={artwork}
                            className="w-12 h-12 flex items-center justify-center border border-muted/20 hover:border-red-500 bg-transparent text-muted-foreground hover:bg-red-50 rounded-full"
                            iconClassName="w-6 h-6"
                        />
                        <AddToCartButton artwork={artwork} />
                    </div>
                </div>
            </div>

            {/* Social Section */}
            <div className="max-w-3xl mx-auto mt-24">
                <CommentSection artworkId={artwork._id || artwork.id || ''} />
            </div>
        </div>

    );
}
