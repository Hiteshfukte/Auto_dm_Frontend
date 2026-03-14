'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, UserCheck, Zap } from 'lucide-react';

const steps = [
    {
        num: "01",
        title: "Connect Account",
        desc: "Link your Instagram Professional account in 1 click.",
        icon: <UserCheck className="w-6 h-6" />
    },
    {
        num: "02",
        title: "Set Triggers",
        desc: "Choose a keyword (e.g. 'Price') and the perfect reply.",
        icon: <MessageCircle className="w-6 h-6" />
    },
    {
        num: "03",
        title: "Watch it Fly",
        desc: "AutoDM replies to comments and sends DMs instantly.",
        icon: <Zap className="w-6 h-6" />
    }
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="bg-[#282828] py-32 px-4 md:px-12 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">How it works</h2>
                    <p className="text-xl text-white/50">Three simple steps to automation.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors group"
                        >
                            {/* Number */}
                            <div className="text-8xl font-black text-white/5 absolute -top-6 -right-6 select-none group-hover:text-white/10 transition-colors">
                                {step.num}
                            </div>

                            <div className="bg-gradient-to-br from-purple-500 to-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                                {step.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                            <p className="text-white/60 text-lg leading-relaxed">{step.desc}</p>

                            {idx !== 2 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                                    <ArrowRight className="text-white/20" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
