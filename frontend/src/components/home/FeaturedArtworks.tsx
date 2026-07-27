'use client';

import { useEffect, useState } from 'react';
import ArtworkCard from '@/components/ArtworkCard';
import { Artwork } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function FeaturedArtworks() {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const res = await fetch(`${API_URL}/api/artworks?limit=3`);
                if (!res.ok) {
                    setArtworks([]);
                    return;
                }
                const json = await res.json();
                const data = json.data || [];
                // Ensure we only ever have 3 items on the frontend
                setArtworks(Array.isArray(data) ? data.slice(0, 3) : []);
            } catch (error) {
                console.error('Failed to fetch artworks:', error);
                setArtworks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="aspect-[4/5] bg-muted/20 rounded-lg mb-4" />
                        <div className="h-4 bg-muted/20 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-muted/10 rounded w-1/2 mb-2" />
                    </div>
                ))}
            </div>
        );
    }

    if (artworks.length === 0) {
        return (
            <div className="text-center py-16 text-muted">
                <p>No artworks available yet. Check back soon!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
                <ArtworkCard key={artwork._id || artwork.id} artwork={artwork} />
            ))}
        </div>
    );
}
