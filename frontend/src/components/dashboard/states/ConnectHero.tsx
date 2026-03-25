'use client';

import { motion } from 'framer-motion';
import { Instagram, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ConnectHero() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 bg-gradient-to-br from-[#00685f] to-[#008378] rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-[#00685f]/20"
            >
                <Instagram className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold text-[#191c1e] font-headline mb-6 tracking-tight"
            >
                Connect Your Instagram
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-[#565e74] font-medium mb-10 leading-relaxed"
            >
                Unlock the power of automated DMs. Connect your business account to start converting comments into leads.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-6 w-full"
            >
                <Link
                    href="/dashboard/instagram"
                    className="group relative inline-flex items-center justify-center gap-3 bg-[#006a61] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#005049] transition-all w-full md:w-auto min-w-[280px] shadow-[0px_10px_20px_rgba(0,104,95,0.2)] hover:-translate-y-1"
                >
                    Connect Business Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center gap-2 text-[#565e74] text-sm font-semibold mt-4">
                    <ShieldCheck className="w-4 h-4 text-[#00685f]" />
                    <span>We never post anything without your permission.</span>
                </div>
            </motion.div>
        </div>
    );
}
