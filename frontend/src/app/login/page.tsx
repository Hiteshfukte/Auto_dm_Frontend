'use client';

import { motion } from 'framer-motion';
import { Instagram, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '@/lib/constants';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#282828] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#1A1A1A] rounded-2xl p-8 border border-white/10 text-center shadow-xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20"
                >
                    <Instagram className="w-10 h-10 text-white" />
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-2">AutoDM</h1>
                <p className="text-white/50 mb-8">
                    Connect your Instagram Business account to get started with automated DMs.
                </p>

                <a
                    href={`${API_BASE_URL}/api/auth/facebook/login`}
                    className="group relative flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all w-full"
                >
                    Continue with Facebook
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <p className="text-white/30 text-xs mt-6">
                    Powered by official Meta Graph API
                </p>
            </div>
        </div>
    );
}
