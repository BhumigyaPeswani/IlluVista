'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Save, User, Mail, Camera } from 'lucide-react';

export default function SettingsPage() {
    const { user, login, accessToken } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [profileImage, setProfileImage] = useState(user?.profileImage || '');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        // Simulate API call
        setTimeout(() => {
            if (accessToken && user) {
                // Update local state to reflect changes immediately
                const updatedUser = { ...user, name, profileImage };
                login(accessToken, updatedUser);
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update profile.' });
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted text-sm mt-1">Manage your profile and account settings.</p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Image */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Profile Image</label>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-2xl font-bold text-neutral-400">{name?.[0]}</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={profileImage}
                                    onChange={(e) => setProfileImage(e.target.value)}
                                    placeholder="Enter image URL"
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                                />
                                <p className="text-xs text-muted mt-1">Paste a direct link to an image (e.g., from Unsplash).</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    className="w-full bg-neutral-100 border border-neutral-200 rounded-lg pl-10 pr-4 py-2 text-sm text-neutral-500 cursor-not-allowed"
                                />
                            </div>
                            <p className="text-xs text-muted mt-1">Email cannot be changed.</p>
                        </div>
                    </div>

                    {message.text && (
                        <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="flex justify-end pt-4 border-t border-neutral-100">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
