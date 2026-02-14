'use client';

import Navbar from '@/components/Navbar';
import PricingCard from '@/components/pricing/PricingCard';
import ComparisonTable from '@/components/pricing/ComparisonTable';
import Footer from '@/components/Footer'; // Assuming Footer exists or I'll need to create/omit it. I'll omit if not sure, but good practice to have layout. 
// I'll assume standard layout wraps it if I use the root layout, but wait, `src/app/pricing/page.tsx` inside `src/app` will use `src/app/layout.tsx`.
// `src/app/layout.tsx` usually has Navbar/Footer or similar. I'll check `src/app/layout.tsx` next if needed. 
// For now, I'll allow the layout to handle Navbar if it does. 
// Actually, looking at `src/app/layout.tsx` (implied from Navbar view), it likely wraps children.
// BUT, I'll explicitly include Navbar if the root layout doesn't enforce it for all (which it usually does). 
// Let's stick to just the content assuming Global Layout handles Nav.
// WAIT, `src/app/layout.tsx` typically has the `html` and `body` tags. 
// I'll double check `src/app/layout.tsx` first quickly to be safe? No, let's just make the page content.
// If Navbar is missing I'll add it. Better to be safe: I'll add a wrapper if I'm not sure.
// Actually, I'll just put the content. The user "Prepare IlluVista for future SaaS subscriptions" implies it's a major page.

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-neutral-900 mb-6">
                        Choose your creative journey
                    </h1>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                        Whether you're just starting or looking to scale your art business, we have a plan for you.
                    </p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto -mt-32">
                    <PricingCard
                        title="Free Artist"
                        price="$0"
                        description="Perfect for hobbyists and improved visibility."
                        features={[
                            '3 Artwork Uploads / month',
                            'Basic Portfolio Page',
                            'Community Access',
                            'Standard Support',
                            '15% Commission on Sales'
                        ]}
                        buttonText="Get Started"
                        href="/register?plan=free"
                    />
                    <PricingCard
                        title="Pro Artist"
                        price="$15"
                        description="For serious artists who want to grow their brand."
                        features={[
                            'Unlimited Uploads',
                            'Custom Domain / Profile URL',
                            'Advanced Analytics',
                            'Priority Support',
                            '0% Commission on Sales',
                            'Verified Badge',
                            'Featured in Gallery'
                        ]}
                        buttonText="Go Pro"
                        href="/register?plan=pro"
                        isPopular={true}
                    />
                </div>
            </div>

            {/* Comparison Section */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-bold text-center mb-12">Compare Plans</h2>
                <ComparisonTable />
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto px-6 py-16 border-t border-neutral-200">
                <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Can I switch plans later?</h3>
                        <p className="text-neutral-500">Yes, you can upgrade or downgrade your plan at any time from your account settings.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">How do payouts work?</h3>
                        <p className="text-neutral-500">Earnings are processed via Stripe and deposited directly to your bank account every week.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Is there a long-term contract?</h3>
                        <p className="text-neutral-500">No, all plans are month-to-month. You can cancel at any time.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
