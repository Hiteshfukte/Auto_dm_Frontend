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
        handleModalClose();
        window.location.reload(); 
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto mt-4 px-4 relative z-10">
            {/* Header */}
            <header className="relative z-10">
                <h1 className="text-4xl font-extrabold text-[#191c1e] font-headline mb-3 tracking-tight">Automations</h1>
                <p className="text-[#565e74] text-lg font-medium">Select a reel to set up an automation.</p>
            </header>

            {/* Step 1: Select Reel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#ffffff] border border-[#c3c5d9]/30 rounded-3xl p-8 shadow-[0px_10px_30px_rgba(0,104,95,0.05)]"
            >
                <h2 className="text-xl font-bold text-[#191c1e] mb-2 font-headline tracking-tight">📱 Your Recent Reels</h2>
                <p className="text-[#565e74] text-sm mb-6 font-medium">Click on a reel to set up an automation for it.</p>
                <ReelGrid onSelectReel={handleReelSelect} selectedReelId={selectedReel?.id} />
            </motion.div>

            {/* Existing Automations */}
            <div>
                <AutomationList />
            </div>

            {/* Tips Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#00685f]/10 to-[#6bd8cb]/10 border border-[#00685f]/20 rounded-3xl p-8"
            >
                <h3 className="text-lg font-bold text-[#00685f] mb-3 font-headline tracking-tight">💡 Pro Tips</h3>
                <ul className="space-y-2 text-[#565e74] text-sm font-medium">
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
