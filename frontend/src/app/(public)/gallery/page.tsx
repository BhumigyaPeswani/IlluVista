'use client';

import ArtworkCard from "@/components/ArtworkCard";
import { Artwork } from "@/types";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const CATEGORIES = ['All', 'Digital 3D', 'Generative', 'Photography', 'Digital Painting', 'Illustration'];

export default function GalleryPage() {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            try {
                const query = activeCategory !== 'All' ? `?category=${encodeURIComponent(activeCategory)}` : '';
                const res = await fetch(`${API_URL}/api/artworks${query}`);
                const json = await res.json();
                const data = json.data || [];
                setArtworks(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch artworks:', error);
                setArtworks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, [activeCategory]);

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-24">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif mb-4">The Collection</h1>
                <p className="text-muted max-w-2xl mx-auto">
                    Explore our curated selection of digital masterpieces.
                    Each piece is a unique convergence of technology and emotion.
                </p>
            </header>

            {/* Category Filters */}
            <div className="flex justify-center gap-6 text-sm uppercase tracking-wide mb-16 text-muted overflow-x-auto pb-4">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={
                            activeCategory === cat
                                ? "text-foreground font-medium border-b border-accent pb-1"
                                : "hover:text-foreground transition-colors"
                        }
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="aspect-[4/5] bg-muted/20 rounded-lg mb-4" />
                            <div className="h-4 bg-muted/20 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-muted/10 rounded w-1/2 mb-2" />
                            <div className="h-3 bg-muted/10 rounded w-1/4" />
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && artworks.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4 opacity-20">🎨</div>
                    <h3 className="text-xl font-serif mb-2">No artworks found</h3>
                    <p className="text-muted text-sm">
                        {activeCategory !== 'All'
                            ? `No artworks in "${activeCategory}" category yet.`
                            : 'Check back soon for new art.'}
                    </p>
                    {activeCategory !== 'All' && (
                        <button
                            onClick={() => setActiveCategory('All')}
                            className="mt-4 text-sm text-accent hover:underline"
                        >
                            View all artworks
                        </button>
                    )}
                </div>
            )}

            {/* Artwork Grid */}
            {!loading && artworks.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {artworks.map((artwork) => (
                        <ArtworkCard key={artwork._id || artwork.id} artwork={artwork} />
                    ))}
                </div>
            )}
        </div>
    );
}
