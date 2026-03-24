'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import StatsCards from '@/components/dashboard/StatsCards';
import AutomationList from '@/components/dashboard/AutomationList';
import ReelGrid from '@/components/dashboard/ReelGrid';
import CreateAutomationModal from '@/components/dashboard/CreateAutomationModal';
import ConnectHero from '@/components/dashboard/states/ConnectHero';
import FetchReelsCard from '@/components/dashboard/states/FetchReelsCard';

import { API_BASE_URL } from '@/lib/constants';

// State Enum
type DashboardState = 'LOADING' | 'NEW_USER' | 'CONNECTED_NO_REELS' | 'ACTIVATION' | 'ACTIVE';

export default function DashboardPage() {
    const [state, setState] = useState<DashboardState>('LOADING');
    const [isConnected, setIsConnected] = useState(false);
    const [activeAutomationsCount, setActiveAutomationsCount] = useState(0);
    const [hasReels, setHasReels] = useState(false);

    // For Activation State
    const [selectedReel, setSelectedReel] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const checkState = async () => {
        try {
            // 1. Check Connection
            const statusRes = await fetch(`${API_BASE_URL}/api/config/status`);
            const statusData = await statusRes.json();

            if (!statusData.instagram_connected) {
                setState('NEW_USER');
                return;
            }
            setIsConnected(true);

            // 2. Check Automations
            const statsRes = await fetch(`${API_BASE_URL}/api/stats`);
            const statsData = await statsRes.json();
            setActiveAutomationsCount(statsData.active_automations);

            // 3. Check Reels (we'll assume if they have automations, they might not need to fetch reels immediately to show the list, 
            // but for the state machine logic:

            if (statsData.active_automations > 0) {
                setState('ACTIVE');
                return;
            }

            // If no automations, check if we have fetched reels to show the grid
            // We can check this by trying to fetch reels or checking a specific flag. 
            // For now, let's fetch them. specific endpoint or minimal check would be better but:
            const reelsRes = await fetch(`${API_BASE_URL}/api/instagram/reels`);
            const reelsData = await reelsRes.json();

            if (Array.isArray(reelsData) && reelsData.length > 0) {
                setHasReels(true);
                setState('ACTIVATION');
            } else {
                setHasReels(false);
                setState('CONNECTED_NO_REELS');
            }

        } catch (error) {
            console.error("Dashboard state check failed", error);
            setState('NEW_USER'); // Fallback
        }
    };

    useEffect(() => {
        checkState();
    }, []);

    const handleReelSelect = (reel: any) => {
        setSelectedReel(reel);
        setIsModalOpen(true);
    };

    const handleAutomationCreated = () => {
        setIsModalOpen(false);
        // Refresh state - should move to ACTIVE
        checkState();
    };

    if (state === 'LOADING') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header - Show greeting only if connected */}
            {state !== 'NEW_USER' && (
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-white/50 mt-1">
                        Welcome back! 👋
                    </p>
                </div>
            )}

            {/* Always show Stats if connected ? Or only in Active? 
               User req: "1. First Time -> No analytics". "5. Active -> List" 
               Let's show stats for states > NEW_USER
            */}
            {state !== 'NEW_USER' && <StatsCards />}

            {state === 'NEW_USER' && (
                <ConnectHero />
            )}

            {state === 'CONNECTED_NO_REELS' && (
                <FetchReelsCard onFetchComplete={checkState} />
            )}

            {state === 'ACTIVATION' && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-white mb-2">🚀 Let's set up your first automation</h2>
                        <p className="text-white/60 mb-6">Select a reel below to start converting comments into leads.</p>
                        <ReelGrid onSelectReel={handleReelSelect} selectedReelId={selectedReel?.id} />
                    </div>
                </div>
            )}

            {state === 'ACTIVE' && (
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Active Automations</h2>
                        <button
                            onClick={() => setState('ACTIVATION')} // Go back to picker to add more
                            className="text-purple-400 hover:text-purple-300 font-medium text-sm"
                        >
                            + New Automation
                        </button>
                    </div>
                    <AutomationList />
                </div>
            )}

            <CreateAutomationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleAutomationCreated}
                initialData={selectedReel ? {
                    media_id: selectedReel.id,
                    thumbnail_url: selectedReel.thumbnail_url || selectedReel.media_url,
                    caption: selectedReel.caption
                } : null}
            />
        </div>
    );
}
