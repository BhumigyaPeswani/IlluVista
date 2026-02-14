'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = (artwork: Artwork) => {
        setItems((prev) => {
            // Avoid duplicates for unique art
            if (prev.some(item => (item.artwork._id || item.artwork.id) === (artwork._id || artwork.id))) return prev;
            return [...prev, { artwork }];
        });
        setIsOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => (item.artwork._id || item.artwork.id) !== id));
    };

    const toggleCart = () => setIsOpen((prev) => !prev);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, isOpen, toggleCart }}>
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
