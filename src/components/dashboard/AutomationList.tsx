'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Play, Edit2, Trash2, MessageSquare, Link as LinkIcon, Users, Image as ImageIcon } from 'lucide-react';
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
            const res = await fetch('http://localhost:8000/api/automations');
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
        await fetch(`http://localhost:8000/api/automations/${id}`, { method: 'DELETE' });
        fetchAutomations();
    };

    const handleCreateUpdate = () => {
        setEditingAuto(null);
        fetchAutomations();
    };

    if (loading) return <div className="text-white/50">Loading automations...</div>;

    if (automations.length === 0) {
        return (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-white/40 mb-4">No automations found</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {automations.map((auto) => (
                <motion.div
                    key={auto.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-zinc-900 border border-white/5 rounded-2xl p-5 hover:border-purple-500/30 transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden"
                >
                    {/* Active Indicator Strip */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${auto.active ? 'bg-green-500' : 'bg-red-500/30'}`} />

                    {/* Reel Thumbnail / Context */}
                    <div className="shrink-0">
                        {auto.thumbnail_url ? (
                            <div className="relative w-20 h-32 rounded-lg overflow-hidden border border-white/10 bg-black">
                                <img src={auto.thumbnail_url} alt="Reel" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute bottom-1 right-1 bg-black/60 rounded px-1 py-0.5">
                                    <Play className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        ) : (
                            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-white/5">
                                <span className="text-xs text-white/40 font-bold uppercase tracking-wider">Global</span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 py-1">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="font-bold text-white text-lg truncate pr-4">{auto.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-white/40">
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-white/70 font-mono text-xs">
                                        "{auto.keyword}"
                                    </span>
                                    <span>•</span>
                                    <span>{auto.active ? 'Active' : 'Paused'}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setEditingAuto(auto)}
                                    className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(auto.id)}
                                    className="p-2 hover:bg-red-500/10 rounded-lg text-white/50 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                            <div className="flex items-center gap-2 text-sm text-white/60">
                                <MessageSquare className="w-4 h-4 text-purple-400" />
                                <span className="truncate max-w-[120px]">{auto.message}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/60">
                                <LinkIcon className="w-4 h-4 text-blue-400" />
                                <span className="truncate max-w-[120px]">{auto.link || 'No link'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/60">
                                <Users className="w-4 h-4 text-pink-400" />
                                <span>{auto.follow_gate ? 'Follow Gate On' : 'No Gate'}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}

            {editingAuto && (
                <CreateAutomationModal
                    isOpen={true}
                    onClose={() => setEditingAuto(null)}
                    onCreate={handleCreateUpdate}
                    initialData={editingAuto}
                />
            )}
        </div>
    );
}
