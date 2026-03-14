'use client';

import { motion } from 'framer-motion';
import { Instagram, LogOut, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function InstagramPage() {
    const [status, setStatus] = useState<'loading' | 'connected' | 'disconnected'>('loading');
    const [businessId, setBusinessId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/config/status');
            const data = await res.json();
            if (data.instagram_connected) {
                setStatus('connected');
                setBusinessId(data.business_id);
            } else {
                setStatus('disconnected');
            }
        } catch (e) {
            console.error(e);
            setStatus('disconnected');
        }
    };

    const handleOAuthConnect = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/auth/facebook/login');
            const data = await res.json();
            if (data.url) {
                // Redirect user to Facebook
                window.location.href = data.url;
            } else {
                alert("Error: " + (data.error || "Failed to get auth URL"));
            }
        } catch (e) {
            console.error(e);
            alert("Connection Error. Check console.");
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        if (!confirm("Are you sure you want to disconnect? Automations will stop working.")) return;
        try {
            await fetch('http://localhost:8000/api/config/disconnect', { method: 'POST' });
            await checkStatus();
        } catch (e) {
            console.error(e);
        }
    };

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-white/50">Loading status...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Instagram Connection</h1>
                <p className="text-white/50">Manage your connection to the Instagram Graph API.</p>
            </header>

            {status === 'connected' ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 flex items-start justify-between"
                >
                    <div className="flex items-start gap-4">
                        <div className="bg-green-500/20 p-3 rounded-xl">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Connected Successfully</h2>
                            <p className="text-white/60 mb-4">Your Instagram Business Account is active and ready for automations.</p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg text-sm font-mono text-white/40">
                                <span>ID: {businessId}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleDisconnect}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium px-4 py-2 hover:bg-red-500/10 rounded-lg"
                    >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900 border border-white/5 rounded-2xl p-12 flex flex-col items-center text-center"
                >
                    <div className="bg-blue-600/20 p-6 rounded-3xl mb-8">
                        <Instagram className="w-20 h-20 text-blue-500" />
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4">Connect your Account</h2>
                    <p className="text-white/50 max-w-lg mb-10 leading-relaxed">
                        Connect your Instagram Business account to enable automatic DM replies, comment tracking, and lead generation.
                    </p>

                    <button
                        onClick={handleOAuthConnect}
                        disabled={loading}
                        className="bg-[#0064e0] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#005bb5] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-blue-900/20"
                    >
                        {loading ? 'Redirecting...' : (
                            <>
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                Continue with Facebook
                            </>
                        )}
                    </button>

                    <div className="mt-8 flex items-center gap-2 text-xs text-white/30 bg-white/5 px-4 py-2 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        <span>Requires a Facebook Page linked to an Instagram Business Profile.</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
