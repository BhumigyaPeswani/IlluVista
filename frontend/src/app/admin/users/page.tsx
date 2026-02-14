'use client';

import { User } from '@/types';
import { MoreHorizontal, Search, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${API_URL}/api/admin/users`, { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted text-sm mt-1">Manage platform users and permissions.</p>
                </div>
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-neutral-200 w-full sm:w-64"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-12 bg-neutral-100 animate-pulse rounded" />
                        ))}
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-neutral-50 text-neutral-500 font-medium border-b border-neutral-200">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-medium">
                                                {user.name?.[0] || '?'}
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-900">{user.name}</p>
                                                <p className="text-xs text-neutral-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                                            ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                user.role === 'ARTIST' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    'bg-neutral-50 text-neutral-700 border-neutral-100'}`}>
                                            {user.role === 'ADMIN' && <Shield className="w-3 h-3" />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
