'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hash, Link2, Shield, Sparkles } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface CreateAutomationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (automation: any) => void;
    initialData?: any;
}

export default function CreateAutomationModal({ isOpen, onClose, onCreate, initialData }: CreateAutomationModalProps) {
    const [name, setName] = useState('');
    const [keyword, setKeyword] = useState('');
    const [message, setMessage] = useState('');
    const [link, setLink] = useState('');
    const [followGate, setFollowGate] = useState(false);
    const [loading, setLoading] = useState(false);

    const [mediaId, setMediaId] = useState<string | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [caption, setCaption] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && initialData) {
            setName(initialData.name || '');
            setKeyword(initialData.keyword || '');
            setMessage(initialData.message || '');
            setLink(initialData.link || '');
            setFollowGate(initialData.followGate || initialData.follow_gate || false);
            setMediaId(initialData.media_id || null);
            setThumbnailUrl(initialData.thumbnail_url || null);
            setCaption(initialData.caption || null);
        } else if (!isOpen) {
            setName('');
            setKeyword('');
            setMessage('');
            setLink('');
            setFollowGate(false);
            setMediaId(null);
            setThumbnailUrl(null);
            setCaption(null);
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name,
            keyword,
            message,
            link,
            follow_gate: followGate,
            active: true,
            media_id: mediaId,
            thumbnail_url: thumbnailUrl,
            caption: caption,
        };

        try {
            let savedAutomation;
            if (initialData?.id) {
                const res = await apiFetch(`/api/automations/${initialData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error("Update failed");
                savedAutomation = { ...initialData, ...payload };
            } else {
                const res = await apiFetch('/api/automations', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error("Create failed");
                savedAutomation = await res.json();
            }
            onCreate(savedAutomation);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save automation. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#00201d]/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-[#ffffff] border border-[#c3c5d9]/30 rounded-3xl w-full max-w-lg shadow-[0px_20px_40px_rgba(0,104,95,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-[#e6e8ea]">
                                <div className="flex items-center gap-4">
                                    {thumbnailUrl ? (
                                        <img src={thumbnailUrl} alt="Reel" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00685f] to-[#008378] flex items-center justify-center shadow-sm">
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-xl font-extrabold text-[#191c1e] font-headline tracking-tight">
                                            {initialData?.id ? 'Edit Automation' : 'New Automation'}
                                        </h2>
                                        {mediaId && <p className="text-[#565e74] text-xs font-bold">Reel: {mediaId.slice(0, 12)}...</p>}
                                    </div>
                                </div>
                                <button onClick={onClose} className="text-[#c3c5d9] hover:text-[#191c1e] transition-colors p-2 hover:bg-[#f2f4f6] rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-[#191c1e] text-sm font-bold mb-2">Automation Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., Free Hooks Giveaway"
                                        required
                                        className="w-full bg-[#f7f9fb] border border-[#c3c5d9]/50 rounded-xl py-3 px-4 text-[#191c1e] placeholder:text-[#c3c5d9] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#191c1e] text-sm font-bold mb-2">Trigger Keyword</label>
                                    <div className="relative">
                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c3c5d9] w-5 h-5" />
                                        <input
                                            type="text"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value.toLowerCase().replace(/\s/g, ''))}
                                            placeholder="hooks"
                                            required
                                            className="w-full bg-[#f7f9fb] border border-[#c3c5d9]/50 rounded-xl py-3 pl-12 pr-4 text-[#191c1e] placeholder:text-[#c3c5d9] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] transition-all"
                                        />
                                    </div>
                                    <p className="text-[#565e74] text-xs mt-2 font-medium">Users comment this keyword to receive your DM</p>
                                </div>

                                <div>
                                    <label className="block text-[#191c1e] text-sm font-bold mb-2">DM Message</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Hey! 👋 Thanks for your interest..."
                                        required
                                        rows={4}
                                        maxLength={500}
                                        className="w-full bg-[#f7f9fb] border border-[#c3c5d9]/50 rounded-xl py-3 px-4 text-[#191c1e] placeholder:text-[#c3c5d9] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] transition-all resize-none"
                                    />
                                    <p className="text-[#565e74] text-xs mt-2 text-right font-medium">{message.length}/500</p>
                                </div>

                                <div>
                                    <label className="block text-[#191c1e] text-sm font-bold mb-2">Attachment Link (optional)</label>
                                    <div className="relative">
                                        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c3c5d9] w-5 h-5" />
                                        <input
                                            type="url"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            placeholder="https://your-link.com/resource"
                                            className="w-full bg-[#f7f9fb] border border-[#c3c5d9]/50 rounded-xl py-3 pl-12 pr-4 text-[#191c1e] placeholder:text-[#c3c5d9] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-[#f7f9fb] border border-[#c3c5d9]/50 rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#6bd8cb]/20 rounded-lg">
                                            <Shield className="w-5 h-5 text-[#00685f]" />
                                        </div>
                                        <div>
                                            <p className="text-[#191c1e] font-bold text-sm">Follow Gate</p>
                                            <p className="text-[#565e74] text-xs font-medium">Only send DM if user follows you</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFollowGate(!followGate)}
                                        className={`w-12 h-7 rounded-full relative transition-colors shadow-inner ${followGate ? 'bg-[#00685f]' : 'bg-[#c3c5d9]'}`}
                                    >
                                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${followGate ? 'left-6' : 'left-1'}`} />
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !name || !keyword || !message}
                                    className="w-full bg-gradient-to-br from-[#00685f] to-[#008378] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00685f]/20"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            {initialData?.id ? 'Save Changes' : 'Create Automation'}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
