'use client';

import { motion } from 'framer-motion';
import { Instagram, ArrowRight, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '@/lib/constants';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Animated Background Glows */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[20%] w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]"
            />
            <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]"
            />

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-10 border border-white/10 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
            >
                <div className="absolute -top-12 -right-12 text-purple-500/20">
                    <Sparkles className="w-32 h-32" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-purple-500/25 border border-white/20"
                >
                    <Instagram className="w-12 h-12 text-white" />
                </motion.div>

                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-3 tracking-tight">
                    AutoDM
                </h1>
                <p className="text-white/50 mb-10 leading-relaxed text-sm">
                    Supercharge your Instagram Business with intelligent, automated direct messages and comment replies.
                </p>

                <a
                    href={`${API_BASE_URL}/api/auth/facebook/login`}
                    className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-blue-500 hover:to-indigo-500 transition-all w-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
                >
                    Continue with Facebook
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-white/30 text-xs font-medium uppercase tracking-widest">
                        Powered by official Meta Graph API
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
