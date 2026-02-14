'use client';

import { useAuth } from "@/context/AuthContext";
import ArtworkTable from "@/components/dashboard/ArtworkTable";
import Link from 'next/link';
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Artwork, normalizeArtwork } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function DashboardArtworksPage() {
    const { user } = useAuth();
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            if (!user) return;

            try {
                const res = await fetch(`${API_URL}/api/artworks`, { credentials: 'include' });
                if (res.ok) {
                    const jsonData = await res.json();
                    const artworksList = jsonData.data || [];
                    const normalized = (Array.isArray(artworksList) ? artworksList : []).map(normalizeArtwork);
                    setArtworks(normalized);
                }
            } catch (error) {
                console.error('Failed to fetch artworks:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [user]);

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold">
                        {user.role === 'BUYER' ? 'My Collection' : 'Artworks'}
                    </h1>
                    <p className="text-muted">
                        {user.role === 'ARTIST' && 'Manage your portfolio and listings.'}
                        {user.role === 'BUYER' && 'View your purchased artworks.'}
                        {user.role === 'ADMIN' && 'Moderation and platform-wide artwork management.'}
                    </p>
                </div>
                {user.role === 'ARTIST' && (
                    <Link
                        href="/dashboard/artworks/new"
                        className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Upload New
                    </Link>
                )}
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-muted/10 animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : (
                <ArtworkTable artworks={artworks} role={user.role} />
            )}
        </div>
    );
}
