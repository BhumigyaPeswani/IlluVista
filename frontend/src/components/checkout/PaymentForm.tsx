'use client';

import { useState } from 'react';
import { CreditCard, Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentForm({ total }: { total: number }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        router.push('/checkout/success');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <h3 className="font-medium text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Details
                </h3>

                <div className="grid gap-6 p-6 border rounded-xl hover:border-neutral-300 transition-colors bg-white/50">
                    <div className="space-y-2">
                        <label htmlFor="cardName" className="text-sm font-medium text-muted-foreground">Name on Card</label>
                        <input
                            id="cardName"
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all bg-background"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="cardNumber" className="text-sm font-medium text-muted-foreground">Card Number</label>
                        <div className="relative">
                            <input
                                id="cardNumber"
                                type="text"
                                required
                                placeholder="0000 0000 0000 0000"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all pl-10 bg-background"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                                <CreditCard className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="expiry" className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                            <input
                                id="expiry"
                                type="text"
                                required
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all bg-background"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="cvc" className="text-sm font-medium text-muted-foreground">CVC</label>
                            <div className="relative">
                                <input
                                    id="cvc"
                                    type="text"
                                    required
                                    placeholder="123"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all pl-10 bg-background"
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                                    <Lock className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted">
                    <Lock className="w-3 h-3" />
                    <span>Transactions are secure and encrypted.</span>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        `Pay $${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    )}
                </button>
            </div>
        </form>
    );
}
