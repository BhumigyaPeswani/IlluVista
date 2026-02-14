'use client';

import StatsCard from "@/components/dashboard/StatsCard";
import { Eye, DollarSign, Palette, TrendingUp } from "lucide-react";

export default function ArtistDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold">Artist Overview</h1>
                <p className="text-muted">Welcome back, Elena. Here's how your art is performing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Views"
                    value="12.4K"
                    icon={Eye}
                    trend="+12% this month"
                />
                <StatsCard
                    title="Total Sales"
                    value="$3,450"
                    icon={DollarSign}
                    trend="+5% this month"
                />
                <StatsCard
                    title="Active Artworks"
                    value="8"
                    icon={Palette}
                />
                <StatsCard
                    title="Avg. Price"
                    value="$430"
                    icon={TrendingUp}
                />
            </div>

            {/* Recent Activity Section Placeholder */}
            <div className="bg-card rounded-xl border border-muted/20 p-6">
                <h2 className="text-xl font-serif font-bold mb-4">Recent Sales</h2>
                <div className="h-48 flex items-center justify-center text-muted border-2 border-dashed border-muted/20 rounded-lg">
                    No recent sales data available in mock mode.
                </div>
            </div>
        </div>
    );
}
