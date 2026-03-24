'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
        >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full shadow-lg flex items-center gap-8">
                <a href="#" className="font-bold text-white text-xl tracking-tight hover:opacity-80 transition-opacity">AutoDM</a>

                <div className="hidden md:flex gap-6 text-sm font-medium text-white/80 items-center">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
                    <a href="/login" className="hover:text-white transition-colors">Login</a>
                    <a href="/signup" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
                        Get Started
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
