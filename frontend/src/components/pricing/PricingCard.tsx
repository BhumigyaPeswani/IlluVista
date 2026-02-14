'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';

interface PricingCardProps {
    title: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    buttonText: string;
    href: string;
    isPopular?: boolean;
}

export default function PricingCard({
    title,
    price,
    period = '/month',
    description,
    features,
    buttonText,
    href,
    isPopular = false,
}: PricingCardProps) {
    return (
        <div className={`relative p-8 bg-white rounded-2xl border ${isPopular ? 'border-neutral-900 shadow-xl' : 'border-neutral-200 shadow-sm'} flex flex-col`}>
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
                <p className="text-sm text-neutral-500 mt-2">{description}</p>
            </div>

            <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-900">{price}</span>
                {price !== 'Free' && <span className="text-neutral-500">{period}</span>}
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <Link
                href={href}
                className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-colors
                    ${isPopular
                        ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                        : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                    }`}
            >
                {buttonText}
            </Link>
        </div>
    );
}
