'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hash, Link2, Shield, Sparkles } from 'lucide-react';

interface CreateAutomationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (automation: any) => void;
    initialData?: any;
}

export default function CreateAutomationModal({ isOpen, onClose, onCreate, initialData }: CreateAutomationModalProps) {
    // Form state
    const [name, setName] = useState('');
    const [keyword, setKeyword] = useState('');
    const [message, setMessage] = useState('');
    const [link, setLink] = useState('');
    const [followGate, setFollowGate] = useState(false);
    const [loading, setLoading] = useState(false);

    // Reel context
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
                const res = await fetch(`http://localhost:8000/api/automations/${initialData.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error("Update failed");
                savedAutomation = { ...initialData, ...payload };
            } else {
                const res = await fetch(`http://localhost:8000/api/automations`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-[#1f1f1f] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    {thumbnailUrl ? (
                                        <img src={thumbnailUrl} alt="Reel" className="w-10 h-10 rounded-xl object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-xl font-bold text-white">
                                            {initialData?.id ? 'Edit Automation' : 'New Automation'}
                                        </h2>
                                        {mediaId && <p className="text-white/40 text-xs">Reel: {mediaId.slice(0, 12)}...</p>}
                                    </div>
                                </div>
                                <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">Automation Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., Free Hooks Giveaway"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">Trigger Keyword</label>
                                    <div className="relative">
                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value.toLowerCase().replace(/\s/g, ''))}
                                            placeholder="hooks"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                    <p className="text-white/40 text-xs mt-2">Users comment this keyword to receive your DM</p>
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">DM Message</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Hey! 👋 Thanks for your interest..."
                                        required
                                        rows={4}
                                        maxLength={500}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                    />
                                    <p className="text-white/40 text-xs mt-2 text-right">{message.length}/500</p>
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">Attachment Link (optional)</label>
                                    <div className="relative">
                                        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                                        <input
                                            type="url"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            placeholder="https://your-link.com/resource"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-purple-400" />
                                        <div>
                                            <p className="text-white font-medium">Follow Gate</p>
                                            <p className="text-white/50 text-sm">Only send DM if user follows you</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFollowGate(!followGate)}
                                        className={`w-12 h-7 rounded-full relative transition-colors ${followGate ? 'bg-purple-500' : 'bg-white/20'}`}
                                    >
                                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${followGate ? 'left-6' : 'left-1'}`} />
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !name || !keyword || !message}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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
