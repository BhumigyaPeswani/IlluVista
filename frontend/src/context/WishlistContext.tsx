'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Artwork } from '@/types';
import { useToast } from '@/components/ui/Toast';

interface WishlistContextType {
    items: Artwork[];
    addItem: (artwork: Artwork) => void;
    removeItem: (artworkId: string) => void;
    isInWishlist: (artworkId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Artwork[]>([]);
    const { toast } = useToast();

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse wishlist', e);
            }
        }
    }, []);

    const saveToStorage = (newItems: Artwork[]) => {
        const minimizedItems = newItems.map(item => ({
            _id: item._id,
            id: item.id,
            title: item.title,
            artistName: item.artistName,
            price: item.price,
            image: (item.image && item.image.length < 500 && !item.image.startsWith('data:')) ? item.image : '/placeholder.jpg',
            imageUrl: (item.imageUrl && item.imageUrl.length < 500 && !item.imageUrl.startsWith('data:')) ? item.imageUrl : '/placeholder.jpg'
        }));
        try {
            localStorage.setItem('wishlist', JSON.stringify(minimizedItems));
            return true;
        } catch (e) {
            console.error('Failed to save wishlist to localStorage', e);
            return false;
        }
    };

    const addItem = (artwork: Artwork) => {
        const id = artwork._id || artwork.id;
        if (items.some(item => (item._id || item.id) === id)) {
            toast('Artwork already in wishlist', 'info');
            return;
        }

        const newItems = [...items, artwork];
        if (saveToStorage(newItems)) {
            setItems(newItems);
            toast('Added to wishlist', 'success');
        } else {
            toast('Wishlist full. Remove items to add more.', 'error');
        }
    };

    const removeItem = (artworkId: string) => {
        const newItems = items.filter(item => (item._id || item.id) !== artworkId);
        setItems(newItems);
        saveToStorage(newItems);
        toast('Removed from wishlist', 'info');
    };

    const isInWishlist = (artworkId: string) => {
        return items.some(item => (item._id || item.id) === artworkId);
    };

    const clearWishlist = () => {
        setItems([]);
    };

    return (
        <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
