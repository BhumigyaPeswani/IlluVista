'use client';

import { Order } from "@/types";
import { format } from "date-fns";
import { ExternalLink, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PurchaseHistoryTableProps {
    orders: Order[];
}

export default function PurchaseHistoryTable({ orders }: PurchaseHistoryTableProps) {
    if (orders.length === 0) {
        return (
            <div className="text-center py-12 border rounded-xl bg-muted/5">
                <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4 text-muted">
                    <Package className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-foreground">No purchases yet</h3>
                <p className="text-sm text-muted mt-1">Start collecting artworks to see them here.</p>
                <Link
                    href="/gallery"
                    className="inline-block mt-4 px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                    Browse Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="border rounded-xl overflow-hidden bg-background">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/30 text-muted font-medium border-b">
                        <tr>
                            <th className="px-6 py-4">Artwork</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Receipt</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order) => (
                            <tr key={order.id} className="group hover:bg-muted/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2">
                                        {order.items.map((item) => (
                                            <div key={item.artworkId} className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 bg-muted rounded overflow-hidden flex-shrink-0">
                                                    {/* Ideally we would have real images here. Using placeholder or item.image if valid */}
                                                    <div className="absolute inset-0 bg-neutral-200" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{item.title}</p>
                                                    <Link href={`/artwork/${item.artworkId}`} className="text-xs text-muted hover:underline hover:text-accent">
                                                        View Artwork
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-muted">
                                    {format(new Date(order.createdAt), 'MMM d, yyyy')}
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    ${order.total.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                        ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-muted hover:text-foreground transition-colors" title="View Receipt">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
