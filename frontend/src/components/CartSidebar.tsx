'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartSidebar() {
    const { items, removeItem, isOpen, toggleCart } = useCart();

    const total = items.reduce((sum, item) => sum + item.artwork.price, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-[70] shadow-2xl border-l border-muted/20 flex flex-col"
                    >
                        <div className="p-6 border-b border-muted/20 flex items-center justify-between">
                            <h2 className="font-serif text-2xl">Your Collection</h2>
                            <button onClick={toggleCart} className="hover:text-accent transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="text-center text-muted mt-20">
                                    <p>Your collection is empty.</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.artwork._id || item.artwork.id} className="flex gap-4">
                                        <div className="relative w-20 h-24 bg-muted/10 shrink-0">
                                            <Image
                                                src={item.artwork.image || item.artwork.imageUrl || '/placeholder.jpg'}
                                                alt={item.artwork.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-serif text-lg leading-tight">{item.artwork.title}</h4>
                                            <p className="text-sm text-muted">{item.artwork.artistName}</p>
                                            <p className="font-medium mt-1">${item.artwork.price.toLocaleString()}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.artwork._id || item.artwork.id || '')}
                                            className="text-muted hover:text-red-500 transition-colors h-fit"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 border-t border-muted/20 bg-muted/5">
                            <div className="flex justify-between items-center mb-6 text-xl font-serif">
                                <span>Total</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                            <Link
                                href="/checkout"
                                onClick={toggleCart}
                                className="w-full bg-foreground text-background py-4 text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
