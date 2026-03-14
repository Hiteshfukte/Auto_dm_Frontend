'use client';

import { motion } from 'framer-motion';
import { Film, Download, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface FetchReelsCardProps {
    onFetchComplete: () => void;
}

export default function FetchReelsCard({ onFetchComplete }: FetchReelsCardProps) {
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        setLoading(true);
        try {
            // Include a small artificial delay for UX if the API is too fast, 
            // or just call the API. The API call itself might be fast.
            // But we actually need to trigger the *fetching* on the parent or just re-validate.
            // Since the main page will likely refetch or we just want to transition state:

            // For now, let's assume we just call the reels endpoint to "warm up" or verify we can get them.
            // In a real app we might trigger a background sync.
            const res = await fetch('http://localhost:8000/api/instagram/reels');
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    onFetchComplete();
                } else {
                    alert("No reels found on your account!");
                }
            }
        } catch (e) {
            console.error(e);
            alert("Failed to fetch reels.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-3xl flex items-center justify-center mb-6"
            >
                <Film className="w-10 h-10 text-purple-400" />
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold text-white mb-4"
            >
                Let's Get Your Content
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/50 mb-8"
            >
                Fetch your most recent Reels to start setting up automations.
                We'll pull the latest 10 posts from your profile.
            </motion.p>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={handleFetch}
                disabled={loading}
                className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Fetching Reels...
                    </>
                ) : (
                    <>
                        <Download className="w-5 h-5" />
                        Fetch Recent Reels
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </motion.button>
        </div>
    );
}
