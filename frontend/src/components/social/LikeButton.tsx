'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface LikeButtonProps {
    artworkId: string;
    initialLikes?: number;
}

export default function LikeButton({ artworkId, initialLikes = 0 }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user, accessToken } = useAuth();
    const { toast } = useToast();

    // Fetch like status
    const fetchLikeStatus = async () => {
        try {
            const headers: HeadersInit = {};
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            const res = await fetch(`${API_URL}/api/artworks/${artworkId}/like`, {
                headers,
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setLikes(data.data.count);
                    // Only update isLiked if we have a user (to avoid overwriting with false if checking as guest)
                    if (user) {
                        setIsLiked(data.data.iLiked);
                    }
                }
            }
        } catch (error) {
            console.error('Failed to fetch like status', error);
        }
    };

    // Initial fetch and polling
    useEffect(() => {
        fetchLikeStatus();

        // Poll every 10 seconds for real-time-ish updates
        const interval = setInterval(fetchLikeStatus, 10000);
        return () => clearInterval(interval);
    }, [artworkId, user, accessToken]);

    const handleToggleLike = async () => {
        if (!user) {
            toast('Please sign in to like artworks', 'error');
            return;
        }

        if (isLoading) return;
        setIsLoading(true);

        // Optimistic update
        const previousLiked = isLiked;
        const previousLikes = likes;

        setIsLiked(!isLiked);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);

        try {
            const headers: HeadersInit = {};
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            const res = await fetch(`${API_URL}/api/artworks/${artworkId}/like`, {
                method: 'POST',
                headers,
                credentials: 'include',
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || 'Failed to update like');
            }

            // Sync with server state
            setLikes(data.data.count);
            // Don't override isLiked from server if we just toggled it locally, 
            // unless we want to be strictly consistent. 
            // The server returns the new state, so let's use it.
            setIsLiked(data.data.liked);
        } catch (error) {
            // Revert on error
            setIsLiked(previousLiked);
            setLikes(previousLikes);
            toast('Failed to update like', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggleLike}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isLiked
                ? 'bg-red-50 text-red-500 hover:bg-red-100'
                : 'bg-muted/10 text-muted hover:bg-muted/20 hover:text-foreground'
                }`}
            aria-label={isLiked ? "Unlike artwork" : "Like artwork"}
        >
            <Heart
                className={`w-5 h-5 transition-transform duration-300 ${isLiked ? 'fill-current scale-110' : 'scale-100'
                    }`}
            />
            <span className="font-medium">{likes}</span>
        </button>
    );
}
