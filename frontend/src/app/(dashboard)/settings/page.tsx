'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { User, Lock, Save, Loader2 } from 'lucide-react';

export default function SettingsPage() {
    const { user } = useAuth();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                bio: 'Passionate about digital art and collecting unique pieces.' // Mock bio as schema doesn't have it yet
            }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API update
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            toast('Passwords do not match', 'error');
            setLoading(false);
            return;
        }

        toast('Profile updated successfully', 'success');
        setLoading(false);
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    };

    if (!user) {
        return <div className="p-8 text-center bg-muted/5 rounded-lg">Log in to view settings</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-6">
            <h1 className="text-3xl font-serif font-bold mb-8">Account Settings</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Sidebar / Navigation (Optional for future expansion) */}
                <div className="md:col-span-1 space-y-2">
                    <button className="w-full text-left px-4 py-2 bg-accent/10 text-accent font-medium rounded-lg">
                        Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-muted/5 text-muted transition-colors rounded-lg">
                        Notifications
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-muted/5 text-muted transition-colors rounded-lg">
                        Billing
                    </button>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Public Profile */}
                        <div className="bg-card p-6 rounded-2xl border border-muted/20 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-accent" /> Public Profile
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                        {user.name?.[0]}
                                    </div>
                                    <button type="button" className="text-sm font-medium border border-muted/30 px-4 py-2 rounded-lg hover:bg-muted/5 transition-colors">
                                        Change Avatar
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium uppercase text-muted mb-1">Display Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-muted/5 border border-muted/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium uppercase text-muted mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full bg-muted/10 border border-muted/20 rounded-lg px-4 py-2 text-sm text-muted cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium uppercase text-muted mb-1">Bio</label>
                                    <textarea
                                        name="bio"
                                        rows={3}
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell the world about yourself..."
                                        className="w-full bg-muted/5 border border-muted/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="bg-card p-6 rounded-2xl border border-muted/20 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-accent" /> Security
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium uppercase text-muted mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className="w-full bg-muted/5 border border-muted/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium uppercase text-muted mb-1">New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className="w-full bg-muted/5 border border-muted/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium uppercase text-muted mb-1">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full bg-muted/5 border border-muted/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-xl"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
