'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function CheckoutSuccessPage() {
    const { items, removeItem } = useCart();

    useEffect(() => {
        // Clear cart on mount
        items.forEach(item => removeItem(item.artwork._id || item.artwork.id || ''));

        // Trigger confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="container mx-auto px-4 py-20 max-w-lg text-center space-y-8">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-serif">Payment Successful!</h1>
                <p className="text-muted">Thank you for your purchase. Your order has been confirmed.</p>
            </div>

            <div className="bg-muted/10 p-6 rounded-xl border border-muted/20 space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Order Number</span>
                    <span className="font-mono font-medium">#{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Email Confirmation</span>
                    <span className="font-medium">Sent to your inbox</span>
                </div>
            </div>

            <Link
                href="/dashboard/orders"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            >
                View My Order <ArrowRight className="w-4 h-4" />
            </Link>

            <div>
                <Link href="/gallery" className="text-sm text-muted hover:text-foreground transition-colors">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
