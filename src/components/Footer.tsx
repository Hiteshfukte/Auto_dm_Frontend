'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-[#282828] pt-32 pb-12 border-t border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-24"
                >
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Scale?</span>
                    </h2>
                    <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                        Join us, creators saving time and making money on autopilot.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button className="bg-white text-black px-10 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform">
                            Get Started Free
                        </button>
                        <p className="text-white/40 text-sm mt-4 md:mt-0">No credit card required.</p>
                    </div>
                </motion.div>

                <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-sm pt-12 border-t border-white/10">
                    <p>&copy; 2026 AutoDM Inc.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
