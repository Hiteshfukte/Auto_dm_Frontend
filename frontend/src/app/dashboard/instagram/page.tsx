'use client';

import { motion } from 'framer-motion';
import { Instagram, LogOut, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { API_BASE_URL } from '@/lib/constants';

export default function InstagramPage() {
    const [status, setStatus] = useState<'loading' | 'connected' | 'disconnected'>('loading');
    const [businessId, setBusinessId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        try {
            const res = await apiFetch('/api/config/status');
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

    const handleOAuthConnect = () => {
        setLoading(true);
        window.location.href = `${API_BASE_URL}/api/auth/facebook/login`;
    };

    const handleDisconnect = async () => {
        if (!confirm("Are you sure you want to disconnect? Automations will stop working.")) return;
        try {
            await apiFetch('/api/config/disconnect', { method: 'POST' });
            await checkStatus();
        } catch (e) {
            console.error(e);
        }
    };

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-12 h-12 border-4 border-[#00685f]/30 border-t-[#00685f] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 relative mt-4">
            <header className="relative z-10">
                <h1 className="text-4xl font-extrabold text-[#191c1e] font-headline mb-3 tracking-tight">Instagram Connection</h1>
                <p className="text-[#565e74] text-lg font-medium">Manage your secure connection to the Instagram Graph API.</p>
            </header>

            {status === 'connected' ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-[#ffffff] border border-[#c3c5d9]/30 rounded-3xl p-10 flex items-start justify-between relative overflow-hidden shadow-[0px_20px_40px_rgba(0,104,95,0.08)]"
                >
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#00685f]/10 blur-[60px] rounded-full pointer-events-none" />
                    <div className="flex items-start gap-6 relative z-10">
                        <div className="bg-gradient-to-br from-[#00685f] to-[#008378] p-4 rounded-2xl shadow-lg shadow-[#00685f]/20">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#191c1e] mb-2 tracking-tight font-headline">Connected Successfully</h2>
                            <p className="text-[#565e74] mb-6 text-sm max-w-md leading-relaxed font-medium">Your Instagram Business Account is perfectly synced and ready to power your automated workflows and DMs.</p>
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#f2f4f6] border border-[#c3c5d9]/30 rounded-xl text-sm font-mono text-[#191c1e] font-bold">
                                <span className="uppercase text-[10px] font-extrabold text-[#565e74] tracking-wider">Business ID</span>
                                {businessId}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleDisconnect}
                        className="relative z-10 flex items-center gap-2 text-red-500 hover:text-red-700 transition-all font-bold px-5 py-3 hover:bg-red-50 rounded-xl group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Disconnect
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#ffffff] border border-[#c3c5d9]/30 rounded-3xl p-14 flex flex-col items-center text-center shadow-[0px_20px_40px_rgba(0,104,95,0.08)] relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 via-[#00685f] to-teal-800" />
                    
                    <motion.div 
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="bg-gradient-to-br from-[#00685f] to-[#008378] p-1 rounded-3xl shadow-2xl shadow-[#00685f]/20 mb-10"
                    >
                        <div className="bg-white p-6 rounded-3xl">
                            <Instagram className="w-16 h-16 text-transparent bg-clip-text fill-[url(#ig-gradient)] stroke-[url(#ig-gradient)]" />
                            <svg width="0" height="0">
                                <linearGradient id="ig-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                    <stop stopColor="#f09433" offset="0%" />
                                    <stop stopColor="#e6683c" offset="25%" />
                                    <stop stopColor="#dc2743" offset="50%" />
                                    <stop stopColor="#cc2366" offset="75%" />
                                    <stop stopColor="#bc1888" offset="100%" />
                                </linearGradient>
                            </svg>
                        </div>
                    </motion.div>

                    <h2 className="text-3xl font-extrabold text-[#191c1e] mb-4 tracking-tight font-headline">Connect your Account</h2>
                    <p className="text-[#565e74] max-w-md mb-12 leading-relaxed text-sm font-medium">
                        Instantly link your Instagram Business account to unlock high-converting automated DM replies and smart comment tracking.
                    </p>

                    <button
                        onClick={handleOAuthConnect}
                        disabled={loading}
                        className="group relative bg-gradient-to-br from-[#006a61] to-[#008378] text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-[#005049] hover:to-[#006a61] transition-all shadow-[0px_10px_20px_rgba(0,104,95,0.2)] hover:-translate-y-1 flex items-center gap-4 disabled:opacity-50 disabled:hover:translate-y-0 w-full max-w-sm justify-center"
                    >
                        {loading ? 'Redirecting...' : (
                            <>
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                Continue with Facebook
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="mt-10 flex items-center gap-3 text-xs text-[#006a61] bg-[#006a61]/5 border border-[#006a61]/20 px-5 py-3 rounded-xl font-medium">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Requires a Facebook Page linked to an Instagram Business Profile.</span>
                    </div>

                    <div className="mt-14 w-full max-w-md bg-[#f7f9fb] p-8 rounded-2xl border border-[#c3c5d9]/30 text-left shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                             <Settings className="w-4 h-4 text-[#565e74]" />
                             <h3 className="text-sm font-bold text-[#191c1e] uppercase tracking-widest">Advanced Setup</h3>
                        </div>
                        <p className="text-xs text-[#565e74] mb-6 leading-relaxed font-medium">If your app is restricted by Meta, securely paste your IGAA token here to bypass OAuth linking.</p>
                        
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            await apiFetch('/api/config/connect', {
                                method: 'POST',
                                body: JSON.stringify({
                                    access_token: formData.get('token'),
                                    business_id: formData.get('bid')
                                })
                            });
                            window.location.reload();
                        }} className="space-y-4">
                            <div>
                                <input name="token" required placeholder="IGAA... Access Token" className="w-full bg-white border border-[#c3c5d9]/50 focus:border-[#006a61] focus:ring-1 focus:ring-[#006a61] rounded-xl px-4 py-3 text-sm text-[#191c1e] transition-all outline-none placeholder:text-[#c3c5d9]" />
                            </div>
                            <div>
                                <input name="bid" required placeholder="Instagram Business ID" className="w-full bg-white border border-[#c3c5d9]/50 focus:border-[#006a61] focus:ring-1 focus:ring-[#006a61] rounded-xl px-4 py-3 text-sm text-[#191c1e] transition-all outline-none placeholder:text-[#c3c5d9]" />
                            </div>
                            <button type="submit" className="w-full bg-[#191c1e] hover:bg-[#464e63] text-white font-bold py-3 rounded-xl text-sm transition-all mt-4">
                                Save Manual Config
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
