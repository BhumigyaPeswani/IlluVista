'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Artwork } from '@/types';

interface CartItem {
    artwork: Artwork;
}

interface CartContextType {
    items: CartItem[];
    addItem: (artwork: Artwork) => void;
    removeItem: (id: string) => void;
    isOpen: boolean;
    toggleCart: () => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'illuvista_cart';

function loadCartFromStorage(): CartItem[] {
    try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (!saved) return [];
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveCartToStorage(items: CartItem[]) {
    try {
        const minimized = items.map(({ artwork }) => ({
            artwork: {
                _id: artwork._id,
                id: artwork.id,
                title: artwork.title,
                price: artwork.price,
                artistName: artwork.artistName,
                imageUrl: artwork.imageUrl && artwork.imageUrl.length < 500 ? artwork.imageUrl : '',
                image: artwork.image && artwork.image.length < 500 ? artwork.image : '',
                category: artwork.category,
            }
        }));
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(minimized));
    } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    // ✅ Always start with [] — identical on server AND client → no hydration mismatch
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    // Flag: have we finished loading from localStorage yet?
    const [hydrated, setHydrated] = useState(false);

    // ✅ Step 1: After mount (client only), load saved cart from localStorage
    useEffect(() => {
        const saved = loadCartFromStorage();
        if (saved.length > 0) {
            setItems(saved);
        }
        setHydrated(true);
    }, []);

    // ✅ Step 2: Sync items → localStorage, but ONLY after hydration
    // (prevents overwriting saved data with the initial empty [])
    useEffect(() => {
        if (hydrated) {
            saveCartToStorage(items);
        }
    }, [items, hydrated]);

    const addItem = (artwork: Artwork) => {
        setItems((prev) => {
            if (prev.some(item => (item.artwork._id || item.artwork.id) === (artwork._id || artwork.id))) return prev;
            return [...prev, { artwork }];
        });
        setIsOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => (item.artwork._id || item.artwork.id) !== id));
    };

    const clearCart = () => {
        setItems([]);
        try { localStorage.removeItem(CART_STORAGE_KEY); } catch { /* ignore */ }
    };

    const toggleCart = () => setIsOpen((prev) => !prev);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, isOpen, toggleCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
