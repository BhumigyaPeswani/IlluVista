'use client';

import StatsCard from "@/components/dashboard/StatsCard";
import { ShoppingBag, Heart, Clock } from "lucide-react";

export default function BuyerDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold">My Collection</h1>
                <p className="text-muted">Manage your acquired artworks and orders.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Collected Works"
                    value="3"
                    icon={ShoppingBag}
                />
                <StatsCard
                    title="Favorites"
                    value="12"
                    icon={Heart}
                />
                <StatsCard
                    title="Pending Orders"
                    value="1"
                    icon={Clock}
                    description="In transit"
                />
            </div>

            <div className="bg-card rounded-xl border border-muted/20 p-6">
                <h2 className="text-xl font-serif font-bold mb-4">Recent Acquisitions</h2>
                <div className="space-y-4">
                    {/* Mock Item */}
                    <div className="flex items-center justify-between p-4 bg-muted/5 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted/20 rounded-md"></div>
                            <div>
                                <p className="font-medium">Neon Solitude</p>
                                <p className="text-xs text-muted">Elena Vora</p>
                            </div>
                        </div>
                        <span className="text-sm font-medium">$950</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
