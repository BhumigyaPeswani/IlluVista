import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Artwork, normalizeArtwork } from '@/types';
import WishlistButton from './WishlistButton';

interface ArtworkCardProps {
    artwork: Artwork;
}

const ArtworkCard = memo(function ArtworkCard({ artwork: raw }: ArtworkCardProps) {
    const artwork = normalizeArtwork(raw);

    return (
        <div className="group block relative">
            <Link href={`/artwork/${artwork._id || artwork.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-muted/10 mb-4 rounded-lg">
                    <Image
                        src={artwork.image || artwork.imageUrl || '/placeholder.jpg'}
                        alt={artwork.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
            </Link>

            {/* Wishlist Button - Absolute Positioned */}
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <WishlistButton artwork={raw} />
            </div>

            <Link href={`/artwork/${artwork._id || artwork.id}`}>
                <div className="space-y-1">
                    <h3 className="font-serif text-lg leading-tight group-hover:text-accent transition-colors">
                        {artwork.title}
                    </h3>
                    <p className="text-sm text-muted">
                        {artwork.artistName}
                    </p>
                    <p className="text-sm font-medium mt-2">
                        ${artwork.price?.toLocaleString() ?? 'N/A'}
                    </p>
                </div>
            </Link>
        </div>
    );
});

export default ArtworkCard;
