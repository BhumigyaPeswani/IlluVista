'use client';

import { Check, Minus } from 'lucide-react';

export default function ComparisonTable() {
    const features = [
        { name: 'Artwork Uploads', free: '5 per month', pro: 'Unlimited' },
        { name: 'Commission Fee', free: '15%', pro: '0%' },
        { name: 'Analytics', free: 'Basic', pro: 'Advanced' },
        { name: 'Priority Support', free: <Minus className="w-5 h-5 text-neutral-300" />, pro: <Check className="w-5 h-5 text-green-500" /> },
        { name: 'Featured Placement', free: <Minus className="w-5 h-5 text-neutral-300" />, pro: <Check className="w-5 h-5 text-green-500" /> },
        { name: 'Custom Profile URL', free: <Minus className="w-5 h-5 text-neutral-300" />, pro: <Check className="w-5 h-5 text-green-500" /> },
        { name: 'Verified Badge', free: <Minus className="w-5 h-5 text-neutral-300" />, pro: <Check className="w-5 h-5 text-green-500" /> },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="py-4 px-6 bg-neutral-50 text-neutral-500 font-medium border-b border-t border-l rounded-tl-lg">Feature</th>
                        <th className="py-4 px-6 bg-neutral-50 text-neutral-900 font-bold border-b border-t">Free Artist</th>
                        <th className="py-4 px-6 bg-neutral-50 text-neutral-900 font-bold border-b border-t border-r rounded-tr-lg">Pro Artist</th>
                    </tr>
                </thead>
                <tbody>
                    {features.map((feature, i) => (
                        <tr key={i} className="border-b last:border-0 hover:bg-neutral-50/50 transition-colors">
                            <td className="py-4 px-6 text-sm font-medium text-neutral-700 border-l">{feature.name}</td>
                            <td className="py-4 px-6 text-sm text-neutral-600">
                                {typeof feature.free === 'string' ? feature.free : <div className="flex items-center">{feature.free}</div>}
                            </td>
                            <td className="py-4 px-6 text-sm text-neutral-600 border-r">
                                {typeof feature.pro === 'string' ? feature.pro : <div className="flex items-center">{feature.pro}</div>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
