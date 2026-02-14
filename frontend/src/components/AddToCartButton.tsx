'use client';

import { useCart } from '@/context/CartContext';
import { Artwork } from '@/types';

export default function AddToCartButton({ artwork }: { artwork: Artwork }) {
    const { addItem } = useCart();

    return (
        <button
            onClick={() => addItem(artwork)}
            className="bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 w-full md:w-auto"
        >
            Add to Collection
        </button>
    );
}
