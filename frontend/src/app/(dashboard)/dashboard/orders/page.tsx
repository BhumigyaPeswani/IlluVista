'use client';

import { useAuth } from "@/context/AuthContext";

export default function DashboardOrdersPage() {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-serif font-bold">
                    {user.role === 'BUYER' ? 'Order History' : 'Sales & Orders'}
                </h1>
                <p className="text-muted">Track status and transactional details.</p>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted font-medium border-b">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr>
                            <td className="px-6 py-4 font-mono text-xs">#ORD-7382</td>
                            <td className="px-6 py-4">Oct 24, 2025</td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Completed</span></td>
                            <td className="px-6 py-4 text-right">$450.00</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-mono text-xs">#ORD-9281</td>
                            <td className="px-6 py-4">Nov 02, 2025</td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Processing</span></td>
                            <td className="px-6 py-4 text-right">$1,200.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
