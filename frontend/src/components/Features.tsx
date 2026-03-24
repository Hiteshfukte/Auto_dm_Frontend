'use client';

import { motion } from 'framer-motion';
import { Bot, Zap, ShieldCheck, BarChart3, Mail, MousePointerClick } from 'lucide-react';

const features = [
    {
        title: "24/7 Auto-Reply",
        description: "Never miss a lead. Respond instantly while you sleep.",
        icon: <Bot className="w-8 h-8 text-purple-400" />,
        colSpan: "col-span-12 md:col-span-8",
        bg: "bg-slate-900",
        delay: 0.1
    },
    {
        title: "Smart Filtering",
        description: "Filter keywords like 'Price' or 'Info'.",
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        colSpan: "col-span-12 md:col-span-4",
        bg: "bg-indigo-900/50",
        delay: 0.2
    },
    {
        title: "Follow Gate",
        description: "Grow your followers by unlocking content only after they follow you.",
        icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
        colSpan: "col-span-12 md:col-span-4",
        bg: "bg-stone-900",
        delay: 0.3
    },
    {
        title: "Analytics",
        description: "Track DMs sent, conversion rates, and growth.",
        icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
        colSpan: "col-span-12 md:col-span-8",
        bg: "bg-slate-800",
        delay: 0.4
    },
];

export default function Features() {
    return (
        <section id="features" className="bg-[#282828] py-32 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-20 text-center"
                >
                    Why choose <span className="text-purple-500">AutoDM?</span>
                </motion.h2>

                <div className="grid grid-cols-12 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: feature.delay }}
                            whileHover={{ scale: 1.02 }}
                            className={`${feature.colSpan} ${feature.bg} p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-colors group cursor-default`}
                        >
                            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-white/60 text-lg leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
