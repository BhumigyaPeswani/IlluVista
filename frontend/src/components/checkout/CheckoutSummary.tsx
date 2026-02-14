'use client';

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CheckoutSummary() {
    const { items } = useCart();

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.artwork.price, 0);
    const tax = subtotal * 0.08; // Mock 8% tax
    const shipping = 0; // Free shipping for artwork usually, or calculated
    const total = subtotal + tax + shipping;

    if (items.length === 0) {
        return <div className="p-6 text-muted">Your cart is empty.</div>;
    }

    return (
        <div className="bg-muted/5 rounded-2xl p-6 lg:p-8 space-y-8 h-fit sticky top-24">
            <h2 className="font-serif text-xl border-b border-muted/20 pb-4">Order Summary</h2>

            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                    <div key={item.artwork._id || item.artwork.id} className="flex gap-4">
                        <div className="relative w-16 h-20 bg-muted/20 rounded overflow-hidden shrink-0">
                            <Image
                                src={item.artwork.image || item.artwork.imageUrl || '/placeholder.jpg'}
                                alt={item.artwork.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm leading-tight">{item.artwork.title}</p>
                            <p className="text-xs text-muted mt-1">{item.artwork.artistName}</p>
                            <p className="text-sm font-medium mt-1">${item.artwork.price.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-muted/20">
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-4 border-t border-muted/20">
                    <span>Total</span>
                    <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>

            <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg flex gap-2 items-start">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p>Your payment information is encrypted and secure. We never store your full card details.</p>
            </div>
        </div>
    );
}
