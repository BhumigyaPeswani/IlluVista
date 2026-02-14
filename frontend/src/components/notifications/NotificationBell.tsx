'use client';

import { Bell, MessageSquare, DollarSign, Package, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type NotificationType = 'SALE' | 'COMMENT' | 'ORDER';

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    date: string;
    read: boolean;
    link: string;
}

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'SALE',
            title: 'Artwork Sold!',
            message: 'Your artwork "Neon Solitude" was purchased by Bob Buyer.',
            date: '2 mins ago',
            read: false,
            link: '/dashboard/orders/o1'
        },
        {
            id: '2',
            type: 'COMMENT',
            title: 'New Comment',
            message: 'Elena Vora commented on "Ethereal Construct".',
            date: '1 hour ago',
            read: false,
            link: '/artwork/a1'
        },
        {
            id: '3',
            type: 'ORDER',
            title: 'Order Delivered',
            message: 'Your purchase has been delivered successfully.',
            date: '1 day ago',
            read: true,
            link: '/account/orders'
        }
    ]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const unreadCount = notifications.filter(n => !n.read).length;

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case 'SALE': return <DollarSign className="w-4 h-4 text-green-600" />;
            case 'COMMENT': return <MessageSquare className="w-4 h-4 text-blue-600" />;
            case 'ORDER': return <Package className="w-4 h-4 text-purple-600" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
                <Bell className="w-5 h-5 text-neutral-600" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-neutral-200 z-50 overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                            <h3 className="font-semibold text-sm">Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-neutral-500 text-sm">
                                    No notifications yet.
                                </div>
                            ) : (
                                <div>
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b border-neutral-50 hover:bg-neutral-50 transition-colors relative group ${!notification.read ? 'bg-blue-50/30' : ''}`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="flex gap-3">
                                                <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0
                                                    ${notification.type === 'SALE' ? 'bg-green-50' :
                                                        notification.type === 'COMMENT' ? 'bg-blue-50' : 'bg-purple-50'}`}
                                                >
                                                    {getIcon(notification.type)}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-medium text-neutral-900 leading-none">{notification.title}</p>
                                                    <p className="text-xs text-neutral-500 line-clamp-2">{notification.message}</p>
                                                    <p className="text-[10px] text-neutral-400 font-medium">{notification.date}</p>
                                                </div>
                                                {!notification.read && (
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                                                )}
                                            </div>
                                            <Link href={notification.link} className="absolute inset-0" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
