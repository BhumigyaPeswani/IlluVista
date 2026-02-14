'use client';

import { Download } from 'lucide-react';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_URL}/api/admin/orders`, { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted text-sm mt-1">Transaction history and fulfillment status.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-neutral-50 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-12 bg-neutral-100 animate-pulse rounded" />
                        ))}
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-neutral-50 text-neutral-500 font-medium border-b border-neutral-200">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Artwork</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">
                                        #{(order._id || '').slice(-8).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium">
                                            {order.buyerId?.name || 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {order.artworkId?.title || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        ${(order.price || 0).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                            ${order.paymentStatus === 'completed' ? 'bg-green-50 text-green-700' :
                                                order.paymentStatus === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
                                            {order.paymentStatus?.toUpperCase() || 'UNKNOWN'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
