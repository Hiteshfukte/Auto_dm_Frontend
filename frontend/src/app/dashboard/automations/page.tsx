'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AutomationList from '@/components/dashboard/AutomationList';
import ReelGrid from '@/components/dashboard/ReelGrid';
import CreateAutomationModal from '@/components/dashboard/CreateAutomationModal';

export default function AutomationsPage() {
    const [selectedReel, setSelectedReel] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReelSelect = (reel: any) => {
        setSelectedReel(reel);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedReel(null);
    };

    const handleCreate = () => {
        // Refresh automation list by remounting? Or pass down a refetch function
        // For now, simple close will work since AutomationList fetches on mount
        handleModalClose();
        window.location.reload(); // Quick hack to refresh list
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Automations</h1>
                <p className="text-white/50 mt-1">
                    Select a reel to set up an automation.
                </p>
            </div>

            {/* Step 1: Select Reel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
                <h2 className="text-lg font-bold text-white mb-4">📱 Your Recent Reels</h2>
                <p className="text-white/50 text-sm mb-6">Click on a reel to set up an automation for it.</p>
                <ReelGrid onSelectReel={handleReelSelect} selectedReelId={selectedReel?.id} />
            </motion.div>

            {/* Existing Automations */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4">⚡ Active Automations</h2>
                <AutomationList />
            </div>

            {/* Tips Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6"
            >
                <h3 className="text-lg font-bold text-white mb-2">💡 Pro Tips</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Use specific keywords to target engaged users</li>
                    <li>• Keep your DM message short and friendly</li>
                    <li>• Include a clear call-to-action with a link</li>
                    <li>• Enable "Follow Gate" to grow your followers</li>
                </ul>
            </motion.div>

            {/* Modal */}
            <CreateAutomationModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onCreate={handleCreate}
                initialData={selectedReel ? {
                    media_id: selectedReel.id,
                    thumbnail_url: selectedReel.thumbnail_url || selectedReel.media_url,
                    caption: selectedReel.caption
                } : null}
            />
        </div>
    );
}
