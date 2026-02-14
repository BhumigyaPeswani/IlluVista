'use client';

import { Users, Palette, DollarSign, ShoppingBag, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface Stats {
    users: number;
    artworks: number;
    orders: number;
    revenue: number;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/admin/stats`, { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Revenue', value: stats ? `$${stats.revenue.toLocaleString()}` : '-', icon: DollarSign, trend: '+12.5%', trendUp: true },
        { title: 'Active Users', value: stats ? stats.users.toLocaleString() : '-', icon: Users, trend: '+5.2%', trendUp: true },
        { title: 'Artworks', value: stats ? stats.artworks.toLocaleString() : '-', icon: Palette, trend: '+2.4%', trendUp: true },
        { title: 'Pending Orders', value: stats ? stats.orders.toLocaleString() : '-', icon: ShoppingBag, trend: '-1.5%', trendUp: false },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted text-sm mt-1">Platform performance metrics and recent activity.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div key={card.title} className={`p-6 bg-white rounded-xl border border-neutral-200 shadow-sm ${loading ? 'animate-pulse' : ''}`}>
                        <div className="flex items-center justify-between">
                            <div className="p-2 bg-neutral-100 rounded-lg">
                                <card.icon className="w-5 h-5 text-neutral-600" />
                            </div>
                            <span className={`text-xs font-medium flex items-center gap-1 ${card.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                                {card.trend}
                                {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold">{card.value}</h3>
                            <p className="text-sm text-neutral-500 mt-1">{card.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
                    <h3 className="font-semibold mb-4">Recent Sales</h3>
                    <div className="space-y-4">
                        <div className="text-center py-8 text-neutral-400 text-sm">
                            Sales data will appear here as orders come in.
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
                    <h3 className="font-semibold mb-4">Pending Verifications</h3>
                    <div className="space-y-4">
                        <div className="text-center py-8 text-neutral-400 text-sm">
                            Artist verification requests will appear here.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
