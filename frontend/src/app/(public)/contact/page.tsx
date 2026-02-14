'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function ContactPage() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast('Message sent successfully!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen bg-background py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get in Touch</h1>
                    <p className="text-muted max-w-2xl mx-auto">
                        Have a question about an artwork? Want to collaborate? Or just want to say hi?
                        We'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-serif font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <a href="mailto:support@illuvista.com" className="text-muted hover:text-accent transition-colors">
                                            support@illuvista.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <p className="text-muted">+1 (555) 123-4567</p>
                                        <p className="text-xs text-muted">Mon-Fri, 9am - 6pm EST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Office</p>
                                        <p className="text-muted">
                                            123 Creative Avenue<br />
                                            Design District, NY 10012
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full h-64 bg-muted/10 rounded-2xl border border-muted/20 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                                <span className="text-muted text-sm font-medium">Map Integration Placeholder</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card p-8 rounded-2xl border border-muted/20 shadow-sm">
                        <h3 className="text-2xl font-serif font-bold mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-xs uppercase tracking-wider font-medium text-muted mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-muted/5 border border-muted/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs uppercase tracking-wider font-medium text-muted mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-muted/5 border border-muted/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                        placeholder="you@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-xs uppercase tracking-wider font-medium text-muted mb-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-muted/5 border border-muted/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs uppercase tracking-wider font-medium text-muted mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full bg-muted/5 border border-muted/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                                    placeholder="Tell us more..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-foreground text-background py-3 rounded-lg font-medium hover:bg-accent hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        Send Message <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
