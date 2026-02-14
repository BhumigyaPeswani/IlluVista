'use client';

import { Artwork } from "@/types";
import { Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArtworkTableProps {
    artworks: Artwork[];
    role: 'ARTIST' | 'ADMIN' | 'BUYER';
}

export default function ArtworkTable({ artworks, role }: ArtworkTableProps) {
    return (
        <div className="border rounded-lg overflow-hidden bg-background">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted font-medium border-b">
                    <tr>
                        <th className="px-6 py-4">Artwork</th>
                        <th className="px-6 py-4 hidden md:table-cell">Details</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {artworks.map((artwork) => (
                        <tr key={artwork._id || artwork.id} className="hover:bg-muted/5 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                                        <Image
                                            src={artwork.image || artwork.imageUrl || '/placeholder.jpg'}
                                            alt={artwork.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="md:hidden">
                                        <p className="font-medium truncate max-w-[120px]">{artwork.title}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <p className="font-medium">{artwork.title}</p>
                                <p className="text-xs text-muted">{artwork.category || artwork.medium}</p>
                            </td>
                            <td className="px-6 py-4 font-medium">
                                ${artwork.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                  ${artwork.status === 'listed' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-600'}`}>
                                    {artwork.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Link
                                        href={`/artwork/${artwork._id || artwork.id}`}
                                        className="p-2 hover:bg-muted/10 rounded-full text-muted hover:text-foreground transition-colors"
                                        title="View Public Page"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Link>
                                    {role === 'ARTIST' && (
                                        <>
                                            <button className="p-2 hover:bg-muted/10 rounded-full text-muted hover:text-blue-500 transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-muted/10 rounded-full text-muted hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </>
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
        </div>
    );
}
