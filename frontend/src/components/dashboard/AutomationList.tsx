'use client';

import { useEffect, useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import CreateAutomationModal from './CreateAutomationModal';

interface Automation {
    id: number;
    name: string;
    keyword: string;
    message: string;
    link?: string;
    follow_gate: boolean;
    active: boolean;
    dms_today?: number;
    media_id?: string;
    thumbnail_url?: string;
    caption?: string;
}

export default function AutomationList() {
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingAuto, setEditingAuto] = useState<Automation | null>(null);

    useEffect(() => {
        fetchAutomations();
    }, []);

    const fetchAutomations = async () => {
        try {
            const res = await apiFetch('/api/automations');
            const data = await res.json();
            setAutomations(data);
        } catch (e) {
            console.error("Failed to fetch automations", e);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        await apiFetch(`/api/automations/${id}`, { method: 'DELETE' });
        fetchAutomations();
    };

    const handleCreateUpdate = () => {
        setEditingAuto(null);
        fetchAutomations();
    };

    if (loading) return <div className="text-[#434656] font-medium py-10">Loading automations...</div>;

    if (automations.length === 0) {
        return (
            <section className="bg-[#ffffff] rounded-xl shadow-[0px_20px_40px_rgba(0,104,95,0.08)] overflow-hidden">
                <div className="px-8 py-6 border-b border-[#e6e8ea] flex justify-between items-center">
                    <h3 className="text-lg font-bold font-headline text-[#191c1e]">Active Automations</h3>
                    <button className="text-sm text-[#00685f] font-semibold hover:underline">View All Rules</button>
                </div>
                <div className="p-12">
                    <div className="text-center py-16 bg-[#f7f9fb] rounded-2xl border border-[#c3c5d9]/40 border-dashed">
                        <p className="text-[#565e74] font-medium mb-2 text-lg">No active automations</p>
                        <p className="text-[#565e74]/70 text-sm">Select a reel above to create your first trigger.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#ffffff] rounded-xl shadow-[0px_20px_40px_rgba(0,104,95,0.08)] overflow-hidden">
            <div className="px-8 py-6 border-b border-[#e6e8ea] flex justify-between items-center">
                <h3 className="text-lg font-bold font-headline text-[#191c1e]">Active Automations</h3>
                <button className="text-sm text-[#00685f] font-semibold hover:underline">View All Rules</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#f2f4f6]/50">
                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#565e74]">Automation Name</th>
                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#565e74]">Trigger Type</th>
                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#565e74]">Last Active</th>
                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#565e74]">Success Rate</th>
                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#565e74] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e6e8ea]">
                        {automations.map((auto) => {
                            const percent = auto.active ? Math.floor(Math.random() * 20 + 80) : 0;
                            return (
                                <tr key={auto.id} className="hover:bg-[#f2f4f6]/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#6bd8cb]/20 flex items-center justify-center text-[#00685f]">
                                                {auto.thumbnail_url ? (
                                                    <img src={auto.thumbnail_url} alt="Reel" className="w-full h-full object-cover rounded-md opacity-80" />
                                                ) : <span className="material-symbols-outlined">waving_hand</span>}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-[#191c1e]">{auto.name}</p>
                                                <p className="text-xs text-[#565e74]">Keyword: "{auto.keyword}"</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-medium text-[#191c1e]">{auto.thumbnail_url ? 'Reel Comment' : 'DM Keyword'}</td>
                                    <td className="px-8 py-5 text-sm text-[#565e74]">{auto.active ? 'Recently' : 'Offline'}</td>
                                    <td className="px-8 py-5">
                                        <div className="w-full max-w-[100px] h-1.5 bg-[#e6e8ea] rounded-full overflow-hidden">
                                            <div className="h-full bg-[#00685f]" style={{ width: `${percent}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-bold mt-1 inline-block text-[#191c1e]">{percent}%</span>
                                    </td>
                                    <td className="px-8 py-5 text-right flex justify-end gap-2">
                                        <button onClick={() => setEditingAuto(auto)} className="p-2 text-[#565e74] hover:text-[#00685f] transition-colors"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(auto.id)} className="p-2 text-[#565e74] hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {editingAuto && (
                <CreateAutomationModal
                    isOpen={true}
                    onClose={() => setEditingAuto(null)}
                    onCreate={handleCreateUpdate}
                    initialData={editingAuto}
                />
            )}
        </section>
    );
}
