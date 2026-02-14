'use client';

import { normalizeArtwork } from '@/types';
import { Check, X, Filter } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function AdminArtworksPage() {
    const [artworks, setArtworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const res = await fetch(`${API_URL}/api/admin/artworks`, { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    setArtworks(data.map(normalizeArtwork));
                }
            } catch (error) {
                console.error('Failed to fetch artworks:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, []);

    const handleStatusChange = async (artworkId: string, status: string) => {
        try {
            const res = await fetch(`${API_URL}/api/admin/artworks/${artworkId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
                credentials: 'include',
            });
            if (res.ok) {
                setArtworks(prev =>
                    prev.map(a => a._id === artworkId ? { ...a, status } : a)
                );
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Artwork Moderation</h1>
                    <p className="text-muted text-sm mt-1">Review and approve artwork submissions.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-neutral-50 flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Status: All
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-neutral-100 animate-pulse rounded" />
                        ))}
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-neutral-50 text-neutral-500 font-medium border-b border-neutral-200">
                            <tr>
                                <th className="px-6 py-4">Artwork</th>
                                <th className="px-6 py-4">Artist</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4 text-right">Moderation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {artworks.map((artwork) => (
                                <tr key={artwork._id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-16 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={artwork.image || artwork.imageUrl || '/placeholder.jpg'}
                                                    alt={artwork.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-900">{artwork.title}</p>
                                                <p className="text-xs text-neutral-500">{artwork.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center text-xs">
                                                {artwork.artistName?.[0] || '?'}
                                            </div>
                                            <span className="font-medium">{artwork.artistName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                            ${artwork.status === 'listed' ? 'bg-green-50 text-green-700' :
                                                artwork.status === 'sold' ? 'bg-neutral-100 text-neutral-600' :
                                                    'bg-yellow-50 text-yellow-700'}`}>
                                            {artwork.status === 'hidden' ? 'HIDDEN' : artwork.status?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        ${artwork.price?.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {artwork.status !== 'listed' && (
                                                <button
                                                    onClick={() => handleStatusChange(artwork._id, 'listed')}
                                                    className="p-1.5 hover:bg-green-50 text-neutral-400 hover:text-green-600 rounded-md transition-colors"
                                                    title="Approve / List"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                            {artwork.status !== 'hidden' && (
                                                <button
                                                    onClick={() => handleStatusChange(artwork._id, 'hidden')}
                                                    className="p-1.5 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-md transition-colors"
                                                    title="Hide"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {artworks.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted">
                                        No artworks found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
