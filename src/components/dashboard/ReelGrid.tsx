'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, MessageCircle, Check, Loader2 } from 'lucide-react';

interface Reel {
    id: string;
    caption?: string;
    media_type: string;
    media_url?: string;
    thumbnail_url?: string;
    permalink: string;
    timestamp: string;
    like_count?: number;
    comments_count?: number;
}

interface ReelGridProps {
    onSelectReel: (reel: Reel) => void;
    selectedReelId?: string;
}

export default function ReelGrid({ onSelectReel, selectedReelId }: ReelGridProps) {
    const [reels, setReels] = useState<Reel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchReels() {
            try {
                const res = await fetch('http://localhost:8000/api/instagram/reels');
                const data = await res.json();

                if (data.error) {
                    setError(data.error);
                } else if (Array.isArray(data)) {
                    setReels(data);
                }
            } catch (e) {
                setError("Failed to fetch reels. Is the backend running?");
            } finally {
                setLoading(false);
            }
        }
        fetchReels();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-red-400">
                <p>{error}</p>
            </div>
        );
    }

    if (reels.length === 0) {
        return (
            <div className="text-center p-8 text-white/50">
                <p>No reels found. Post some content first!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {reels.map((reel, idx) => {
                const isSelected = selectedReelId === reel.id;
                const thumbnail = reel.thumbnail_url || reel.media_url;

                return (
                    <motion.div
                        key={reel.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => onSelectReel(reel)}
                        className={`relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer group transition-all ${isSelected
                                ? 'ring-4 ring-purple-500 scale-[1.02]'
                                : 'hover:ring-2 hover:ring-white/30'
                            }`}
                    >
                        {/* Thumbnail */}
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt={reel.caption || 'Reel'}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-white/10 flex items-center justify-center">
                                <Play className="w-8 h-8 text-white/30" />
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                <div className="flex items-center gap-3 text-white text-xs">
                                    <span className="flex items-center gap-1">
                                        <Heart className="w-3 h-3" />
                                        {reel.like_count || 0}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageCircle className="w-3 h-3" />
                                        {reel.comments_count || 0}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Selected Checkmark */}
                        {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                        )}

                        {/* Media Type Badge */}
                        {reel.media_type === 'VIDEO' && (
                            <div className="absolute top-2 left-2">
                                <Play className="w-4 h-4 text-white drop-shadow-lg" />
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
