'use client';

import { useCart } from "@/context/CartContext";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentForm from "@/components/checkout/PaymentForm";
import Link from "next/link";

export default function CheckoutPage() {
    const { items } = useCart();
    const subtotal = items.reduce((sum, item) => sum + item.artwork.price, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 max-w-xl text-center space-y-4">
                <h1 className="text-2xl font-serif">Your cart is empty</h1>
                <p className="text-muted">Looks like you haven't added any artwork to your collection yet.</p>
                <Link
                    href="/gallery"
                    className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors mt-4"
                >
                    Browse Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h1 className="text-3xl font-serif mb-8 border-b pb-4">Secure Checkout</h1>

            <div className="grid lg:grid-cols-[1fr,400px] gap-12">
                <div>
                    <PaymentForm total={total} />
                </div>
                <div>
                    <CheckoutSummary />
                </div>
            </div>
        </div>
    );
}
