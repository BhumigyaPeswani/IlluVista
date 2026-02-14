'use client';

import { useAuth } from "@/context/AuthContext";
import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
    const { user } = useAuth();

    return (
        <header className="h-16 md:h-20 border-b border-muted/20 bg-background/50 backdrop-blur-sm px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 ml-12 md:ml-0">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md hidden lg:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-muted/5 border border-muted/20 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-muted hover:text-foreground transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
                </button>

                <div className="flex items-center gap-3 border-l border-muted/20 pl-6 my-2">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs text-muted mt-1">{user?.role}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-medium">
                        {user?.name?.[0]}
                    </div>
                </div>
            </div>
        </header>
    );
}
