'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { MessageSquare, Send, Trash2, Reply, MoreHorizontal } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
import Link from 'next/link';
import Image from 'next/image';

interface Comment {
    _id: string;
    userId: {
        _id: string;
        name: string;
        avatar?: string;
        profileImage?: string;
    };
    commentText: string;
    createdAt: string;
    replies?: Comment[];
}

interface CommentSectionProps {
    artworkId: string;
}

export default function CommentSection({ artworkId }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { user, accessToken } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        fetchComments();
    }, [artworkId]);

    const fetchComments = async () => {
        try {
            const res = await fetch(`${API_URL}/api/artworks/${artworkId}/comments`);
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setComments(data.data);
                }
            }
        } catch (error) {
            console.error('Failed to fetch comments', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent, parentId: string | null = null) => {
        e.preventDefault();

        if (!user) {
            toast('Please sign in to comment', 'error');
            return;
        }

        const text = parentId ? replyText : newComment;
        if (!text.trim()) return;

        try {
            // accessToken is already available from useAuth
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            };
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            const res = await fetch(`${API_URL}/api/artworks/${artworkId}/comments`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    commentText: text,
                    parentId
                }),
                credentials: 'include'
            });

            const data = await res.json();

            if (data.success) {
                toast('Comment posted', 'success');
                setNewComment('');
                setReplyText('');
                setReplyingTo(null);
                fetchComments(); // Refresh comments
            } else {
                toast(data.message || 'Failed to post comment', 'error');
            }
        } catch (error) {
            toast('Failed to post comment', 'error');
        }
    };

    const handleDelete = async (commentId: string) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        try {
            const headers: HeadersInit = {};
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            const res = await fetch(`${API_URL}/api/comments/${commentId}`, {
                method: 'DELETE',
                headers,
                credentials: 'include'
            });

            if (res.ok) {
                toast('Comment deleted', 'info');
                fetchComments();
            } else {
                toast('Failed to delete comment', 'error');
            }
        } catch (error) {
            toast('Error deleting comment', 'error');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Recursive component for rendering comments
    const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => {
        const isAuthor = user && (user.id === comment.userId._id || user._id === comment.userId._id);
        const isAdmin = user && user.role === 'ADMIN';
        const canDelete = isAuthor || isAdmin;

        return (
            <div className={`group ${isReply ? 'ml-8 mt-3 pl-4 border-l-2 border-muted/20' : 'mb-6'}`}>
                <div className="flex gap-3">
                    <div className="flex-shrink-0">
                        {comment.userId.profileImage || comment.userId.avatar ? (
                            <img
                                src={comment.userId.profileImage || comment.userId.avatar}
                                alt={comment.userId.name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">
                                {comment.userId.name[0]}
                            </div>
                        )}
                    </div>
                    <div className="flex-grow">
                        <div className="bg-muted/5 p-3 rounded-lg rounded-tl-none">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{comment.userId.name}</span>
                                <span className="text-xs text-muted">{formatDate(comment.createdAt)}</span>
                            </div>
                            <p className="text-sm text-foreground/80">{comment.commentText}</p>
                        </div>

                        <div className="flex items-center gap-4 mt-1 ml-1">
                            <button
                                onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                                className="text-xs text-muted hover:text-accent font-medium flex items-center gap-1 transition-colors"
                            >
                                <Reply className="w-3 h-3" /> Reply
                            </button>

                            {canDelete && (
                                <button
                                    onClick={() => handleDelete(comment._id)}
                                    className="text-xs text-red-400 hover:text-red-500 font-medium flex items-center gap-1 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-3 h-3" /> Delete
                                </button>
                            )}
                        </div>

                        {replyingTo === comment._id && (
                            <form onSubmit={(e) => handleSubmit(e, comment._id)} className="mt-3 flex gap-2">
                                <input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder={`Reply to ${comment.userId.name}...`}
                                    className="flex-grow px-3 py-2 text-sm bg-background border border-muted/30 rounded-full focus:outline-none focus:border-accent"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    disabled={!replyText.trim()}
                                    className="bg-accent text-white p-2 rounded-full hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Render Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-2">
                        {comment.replies.map(reply => (
                            <CommentItem key={reply._id} comment={reply} isReply={true} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="pt-8 border-t border-muted/20">
            <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Comments ({comments.length})
            </h3>

            {/* New Comment Input */}
            <form onSubmit={(e) => handleSubmit(e)} className="mb-8 flex gap-3">
                <div className="flex-shrink-0">
                    {user ? (
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                            {user.name?.[0]}
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <UserIcon />
                        </div>
                    )}
                </div>
                <div className="flex-grow relative">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full px-4 py-3 pr-12 bg-muted/5 border border-muted/20 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        disabled={!user}
                    />
                    <button
                        type="submit"
                        disabled={!newComment.trim() || !user}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent hover:bg-accent/10 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>

            <div className="space-y-2">
                {isLoading ? (
                    <div className="text-center py-8 text-muted">Loading comments...</div>
                ) : comments.length > 0 ? (
                    comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} />
                    ))
                ) : (
                    <p className="text-center py-8 text-muted italic">No comments yet. Be the first to share your thoughts!</p>
                )}
            </div>
        </div>
    );
}

function UserIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    )
}
