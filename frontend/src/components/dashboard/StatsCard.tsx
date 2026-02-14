import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    trend?: string;
}

export default function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
    return (
        <div className="bg-card p-6 rounded-xl border border-muted/20 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted">{title}</p>
                <div className="p-2 bg-muted/10 rounded-lg text-foreground">
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-serif font-bold">{value}</h3>
                {description && (
                    <p className="text-xs text-muted mt-1">{description}</p>
                )}
                {trend && (
                    <p className="text-xs font-medium text-emerald-500 mt-2">
                        {trend}
                    </p>
                )}
            </div>
        </div>
    );
}
