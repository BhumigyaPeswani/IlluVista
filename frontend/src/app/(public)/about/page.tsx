import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Palette, ShieldCheck, Globe } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 -z-10" />
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        Bridging the Gap Between <br />
                        <span className="text-accent">Digital Art</span> and <span className="text-accent">Collectors</span>
                    </h1>
                    <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
                        IlluVista is a premier marketplace dedicated to empowering digital artists and
                        providing collectors with curated, high-quality artworks from around the globe.
                    </p>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="p-8 bg-card rounded-2xl border border-muted/20 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                                <Palette className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Curated Excellence</h3>
                            <p className="text-muted">
                                We handpick every artist to ensure a collection that meets the highest standards of creativity and technical skill.
                            </p>
                        </div>
                        <div className="p-8 bg-card rounded-2xl border border-muted/20 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Secure & Transparent</h3>
                            <p className="text-muted">
                                Every transaction is secured, and ownership is transparently transferred, giving peace of mind to both creators and buyers.
                            </p>
                        </div>
                        <div className="p-8 bg-card rounded-2xl border border-muted/20 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Global Reach</h3>
                            <p className="text-muted">
                                We connect artists with a worldwide audience, breaking down geographical barriers to art appreciation and commerce.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story / Context */}
            <section className="py-20 bg-muted/5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 relative aspect-square w-full max-w-lg">
                        <div className="absolute inset-0 bg-accent/10 rounded-2xl transform rotate-3" />
                        {/* Placeholder for an 'About Us' image - using a div for now or a generic placeholder URL */}
                        <div className="absolute inset-0 bg-muted/20 rounded-2xl flex items-center justify-center border border-muted/20">
                            <span className="text-muted">Office / Team Image</span>
                        </div>
                    </div>
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold">Our Story</h2>
                        <p className="text-muted leading-relaxed">
                            Founded in 2024, IlluVista began with a simple question: "Why is it so hard to find high-quality digital art securely?"
                            Existing platforms were either too cluttered or lacked the curation needed for serious collectors.
                        </p>
                        <p className="text-muted leading-relaxed">
                            We set out to build a sanctuary for digital creativity—a place where artists are respected and collectors can discover
                            pieces that truly speak to them. Today, we host thousands of artworks and a thriving community of creators.
                        </p>
                        <div className="pt-4">
                            <Link href="/gallery" className="inline-flex items-center text-accent font-medium hover:underline">
                                Browse the Collection <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Join the Movement?</h2>
                    <p className="text-lg text-muted mb-10">
                        Whether you're an artist looking to showcase your work or a collector seeking the next masterpiece, there's a place for you here.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-all w-full sm:w-auto"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/contact"
                            className="border border-muted/30 hover:border-accent text-foreground px-8 py-3 rounded-full font-medium transition-all w-full sm:w-auto"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
