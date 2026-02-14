'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import PurchaseHistoryTable from '@/components/account/PurchaseHistoryTable';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function PurchasesPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_URL}/api/orders`, { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Purchase History</h1>
                <p className="text-muted text-sm mt-1">View details of your past transactions.</p>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-muted/10 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : (
                <PurchaseHistoryTable orders={orders} />
            )}
        </div>
    );
}
