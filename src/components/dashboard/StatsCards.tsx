'use client';

import { motion } from 'framer-motion';
import { MessageCircle, UserPlus, TrendingUp, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const initialStats = [
    { label: 'DMs Sent', value: '-', icon: MessageCircle, color: 'from-purple-500 to-pink-500' },
    { label: 'New Leads', value: '-', icon: UserPlus, color: 'from-blue-500 to-cyan-500' },
    { label: 'Conversion Rate', value: 'N/A', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Active Automations', value: '-', icon: Zap, color: 'from-orange-500 to-yellow-500' },
];

export default function StatsCards() {
    const [stats, setStats] = useState(initialStats);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('http://localhost:8000/api/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats([
                        { label: 'DMs Sent', value: data.dms_sent.toString(), icon: MessageCircle, color: 'from-purple-500 to-pink-500' },
                        { label: 'New Leads', value: data.leads.toString(), icon: UserPlus, color: 'from-blue-500 to-cyan-500' },
                        { label: 'Success Rate', value: '100%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                        { label: 'Active Automations', value: data.active_automations.toString(), icon: Zap, color: 'from-orange-500 to-yellow-500' },
                    ]);
                }
            } catch (e) {
                console.error(e);
            }
        }
        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-white/50 text-sm">{stat.label}</p>
                </motion.div>
            ))}
        </div>
    );
}
