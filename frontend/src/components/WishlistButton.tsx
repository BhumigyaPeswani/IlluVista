'use client';

import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { Artwork } from '@/types';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface WishlistButtonProps {
    artwork: Artwork;
    className?: string;
    iconClassName?: string;
}

export default function WishlistButton({ artwork, className, iconClassName }: WishlistButtonProps) {
    const { isInWishlist, addItem, removeItem } = useWishlist();
    const [isSaved, setIsSaved] = useState(false);

    // Handle hydration mismatch safely
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Check status only after mount to avoid hydration errors with localStorage
    useEffect(() => {
        if (mounted) {
            const id = artwork._id || artwork.id;
            setIsSaved(isInWishlist(id!));
        }
    }, [mounted, isInWishlist, artwork]);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation if inside a card
        e.stopPropagation();

        const id = artwork._id || artwork.id;
        if (isSaved) {
            removeItem(id!);
            setIsSaved(false);
        } else {
            addItem(artwork);
            setIsSaved(true);
        }
    };

    if (!mounted) {
        return (
            <button className={cn("p-2 rounded-full bg-background/80 hover:bg-background transition-all", className)}>
                <Heart className={cn("w-5 h-5 text-muted", iconClassName)} />
            </button>
        );
    }

    return (
        <button
            onClick={toggleWishlist}
            className={cn(
                "p-2 rounded-full transition-all hover:scale-110 active:scale-95 group",
                isSaved ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-background/80 hover:bg-background text-muted-foreground hover:text-red-500",
                className
            )}
            title={isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            <Heart
                className={cn(
                    "w-5 h-5 transition-all",
                    isSaved ? "fill-current" : "group-hover:fill-current/20",
                    iconClassName
                )}
            />
        </button>
    );
}
