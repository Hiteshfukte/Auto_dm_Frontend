'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/constants';

const initialStats = [
    { label: 'Total Automated DMs', value: '-', trend: '+12.5%' },
    { label: 'Active Comment Trackers', value: '-', trend: '+4.2%' },
    { label: 'Leads Captured', value: '-', trend: '+18.1%' },
    { label: 'Engagement Rate', value: 'N/A', trend: '+2.4%' },
];

export default function StatsCards() {
    const [stats, setStats] = useState(initialStats);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch(`${API_BASE_URL}/api/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats([
                        { label: 'Total Automated DMs', value: (data.dms_sent * 10).toString(), trend: '+12.5%' },
                        { label: 'Active Comment Trackers', value: data.active_automations.toString(), trend: '+4.2%' },
                        { label: 'Leads Captured', value: data.leads.toString(), trend: '+18.1%' },
                        { label: 'Engagement Rate', value: '5.82%', trend: '+2.4%' },
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
            <div className="bg-[#ffffff] p-6 rounded-xl shadow-[0px_20px_40px_rgba(0,104,95,0.08)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#00685f]"></div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-[#6bd8cb]/20 rounded-lg text-[#00685f]">
                        <span className="material-symbols-outlined">send</span>
                    </div>
                    <span className="text-[#00685f] text-xs font-bold bg-[#00685f]/10 px-2 py-0.5 rounded-full">{stats[0].trend}</span>
                </div>
                <p className="text-[#565e74] text-sm font-medium mb-1">{stats[0].label}</p>
                <h3 className="text-2xl font-extrabold font-headline text-[#191c1e]">{stats[0].value}</h3>
            </div>
            
            <div className="bg-[#ffffff] p-6 rounded-xl shadow-[0px_20px_40px_rgba(0,104,95,0.08)] relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-[#dae2fd]/30 rounded-lg text-[#565e74]">
                        <span className="material-symbols-outlined">forum</span>
                    </div>
                    <span className="text-[#565e74] text-xs font-bold bg-[#565e74]/10 px-2 py-0.5 rounded-full">{stats[1].trend}</span>
                </div>
                <p className="text-[#565e74] text-sm font-medium mb-1">{stats[1].label}</p>
                <h3 className="text-2xl font-extrabold font-headline text-[#191c1e]">{stats[1].value}</h3>
            </div>

            <div className="bg-[#ffffff] p-6 rounded-xl shadow-[0px_20px_40px_rgba(0,104,95,0.08)] relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-[#ffdbce]/40 rounded-lg text-[#924628]">
                        <span className="material-symbols-outlined">person_add</span>
                    </div>
                    <span className="text-[#924628] text-xs font-bold bg-[#924628]/10 px-2 py-0.5 rounded-full">{stats[2].trend}</span>
                </div>
                <p className="text-[#565e74] text-sm font-medium mb-1">{stats[2].label}</p>
                <h3 className="text-2xl font-extrabold font-headline text-[#191c1e]">{stats[2].value}</h3>
            </div>

            <div className="bg-[#ffffff] p-6 rounded-xl shadow-[0px_20px_40px_rgba(0,104,95,0.08)] relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-[#89f5e7]/40 rounded-lg text-[#00685f]">
                        <span className="material-symbols-outlined">analytics</span>
                    </div>
                    <span className="text-[#00685f] text-xs font-bold bg-[#00685f]/10 px-2 py-0.5 rounded-full">{stats[3].trend}</span>
                </div>
                <p className="text-[#565e74] text-sm font-medium mb-1">{stats[3].label}</p>
                <h3 className="text-2xl font-extrabold font-headline text-[#191c1e]">{stats[3].value}</h3>
            </div>
        </div>
    );
}
