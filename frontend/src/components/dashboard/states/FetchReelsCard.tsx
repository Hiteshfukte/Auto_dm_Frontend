'use client';

import { motion } from 'framer-motion';
import { Film, Download, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

interface FetchReelsCardProps {
    onFetchComplete: () => void;
}

export default function FetchReelsCard({ onFetchComplete }: FetchReelsCardProps) {
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        setLoading(true);
        try {
            const res = await apiFetch('/api/instagram/reels');
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
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-xl mx-auto bg-[#ffffff] border border-[#c3c5d9]/30 rounded-3xl p-12 shadow-[0px_20px_40px_rgba(0,104,95,0.05)] mt-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 bg-[#6bd8cb]/20 rounded-3xl flex items-center justify-center mb-6"
            >
                <Film className="w-10 h-10 text-[#00685f]" />
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-extrabold text-[#191c1e] font-headline mb-4 tracking-tight"
            >
                Let's Get Your Content
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#565e74] mb-8 font-medium text-lg leading-relaxed max-w-md"
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
                className="flex items-center gap-3 bg-gradient-to-br from-[#00685f] to-[#008378] text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-lg shadow-[#00685f]/20"
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
