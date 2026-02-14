'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).slice(2);
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const getStyle = (type: ToastType) => {
        switch (type) {
            case 'success': return 'bg-green-600 text-white';
            case 'error': return 'bg-red-600 text-white';
            case 'warning': return 'bg-yellow-500 text-black';
            case 'info':
            default: return 'bg-neutral-900 text-white';
        }
    };

    return (
        <ToastContext.Provider value={{ toast: addToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`${getStyle(t.type)} px-5 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-3 animate-slide-in cursor-pointer`}
                        onClick={() => removeToast(t.id)}
                        role="alert"
                    >
                        <span className="flex-1">{t.message}</span>
                        <button
                            onClick={(e) => { e.stopPropagation(); removeToast(t.id); }}
                            className="opacity-70 hover:opacity-100 text-lg leading-none"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes slide-in {
                    from { transform: translateX(120%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </ToastContext.Provider>
    );
}
