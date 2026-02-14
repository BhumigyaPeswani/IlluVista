'use client';

import { useAuth } from "@/context/AuthContext";
import StatsCard from "@/components/dashboard/StatsCard";
import { Eye, DollarSign, Palette, TrendingUp, ShoppingBag, Heart, Clock, Users, Activity } from "lucide-react";

export default function DashboardOverviewPage() {
    const { user } = useAuth();

    if (!user) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold">Dashboard Overview</h1>
                <p className="text-muted">Welcome back, {user.name}. Here is what's happening today.</p>
            </div>

            {user.role === 'ARTIST' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard title="Total Views" value="12.4K" icon={Eye} trend="+12% this month" />
                    <StatsCard title="Total Sales" value="$3,450" icon={DollarSign} trend="+5% this month" />
                    <StatsCard title="Active Artworks" value="8" icon={Palette} />
                    <StatsCard title="Avg. Price" value="$430" icon={TrendingUp} />
                </div>
            )}

            {user.role === 'BUYER' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard title="Collected Works" value="3" icon={ShoppingBag} />
                    <StatsCard title="Favorites" value="12" icon={Heart} />
                    <StatsCard title="Pending Orders" value="1" icon={Clock} description="In transit" />
                </div>
            )}

            {user.role === 'ADMIN' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard title="Total Users" value="1,240" icon={Users} trend="+85 this week" />
                    <StatsCard title="Total Artworks" value="342" icon={Palette} />
                    <StatsCard title="Platform Revenue" value="$45.2K" icon={DollarSign} />
                    <StatsCard title="System Status" value="99.9%" icon={Activity} description="Uptime" />
                </div>
            )}

            {/* Shared Recent Activity / Placeholder Area */}
            <div className="bg-card rounded-xl border border-muted/20 p-6 min-h-[300px] flex items-center justify-center text-muted">
                <div className="text-center">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Activity feed coming soon...</p>
                </div>
            </div>
        </div>
    );
}
