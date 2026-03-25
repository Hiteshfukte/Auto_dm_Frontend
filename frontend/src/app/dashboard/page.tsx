'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import StatsCards from '@/components/dashboard/StatsCards';
import AutomationList from '@/components/dashboard/AutomationList';
import ReelGrid from '@/components/dashboard/ReelGrid';
import CreateAutomationModal from '@/components/dashboard/CreateAutomationModal';
import ConnectHero from '@/components/dashboard/states/ConnectHero';
import FetchReelsCard from '@/components/dashboard/states/FetchReelsCard';

import { API_BASE_URL } from '@/lib/constants';

type DashboardState = 'LOADING' | 'NEW_USER' | 'CONNECTED_NO_REELS' | 'ACTIVATION' | 'ACTIVE';

const ChartAndROI = () => (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#ffffff] p-8 rounded-xl shadow-[0px_20px_40px_rgba(0,104,95,0.08)]">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold font-headline text-[#191c1e]">Automated Messages Sent Over 30 Days</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#00685f]"></span>
                        <span className="text-xs text-[#565e74] font-medium">Automations</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#bec6e0]"></span>
                        <span className="text-xs text-[#565e74] font-medium">Last Period</span>
                    </div>
                </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00685f]/5 to-transparent rounded-lg"></div>
                <div className="w-full h-1/2 bg-gradient-to-t from-[#00685f]/40 to-[#00685f] rounded-t-lg transition-all hover:opacity-80"></div>
                <div className="w-full h-2/3 bg-gradient-to-t from-[#00685f]/40 to-[#00685f] rounded-t-lg transition-all hover:opacity-80"></div>
                <div className="w-full h-1/3 bg-gradient-to-t from-[#00685f]/40 to-[#00685f] rounded-t-lg transition-all hover:opacity-80"></div>
                <div className="w-full h-3/4 bg-gradient-to-t from-[#00685f]/40 to-[#00685f] rounded-t-lg transition-all hover:opacity-80"></div>
                <div className="w-full h-2/3 bg-gradient-to-t from-[#00685f]/40 to-[#00685f] rounded-t-lg transition-all hover:opacity-80"></div>
                <div className="w-full h-1/2 bg-gradient-to-t from-[#00685f]/40 to-[#00685f] rounded-t-lg transition-all hover:opacity-80"></div>
                <div className="w-full h-4/5 bg-gradient-to-t from-[#00685f]/40 to-[#00685f] rounded-t-lg transition-all hover:opacity-80"></div>
                <div className="w-full h-full bg-gradient-to-t from-[#00685f]/40 to-[#00685f] rounded-t-lg transition-all hover:opacity-80"></div>
                <div className="w-full h-3/4 bg-gradient-to-t from-[#00685f]/40 to-[#00685f] rounded-t-lg transition-all hover:opacity-80"></div>
                <div className="w-full h-2/3 bg-gradient-to-t from-[#00685f]/40 to-[#00685f] rounded-t-lg transition-all hover:opacity-80"></div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-[#565e74] font-bold uppercase tracking-widest">
                <span>Day 1</span>
                <span>Day 10</span>
                <span>Day 20</span>
                <span>Day 30</span>
            </div>
        </div>
        <div className="bg-[#ffffff] border border-[#c3c5d9]/30 p-8 rounded-xl flex flex-col justify-between shadow-[0px_20px_40px_rgba(0,104,95,0.08)]">
            <div>
                <h3 className="text-lg font-bold font-headline mb-2 text-[#191c1e]">Campaign ROI</h3>
                <p className="text-[#565e74] text-sm font-medium">Automated interactions vs direct revenue impact.</p>
            </div>
            <div className="py-6">
                <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path className="stroke-[#f2f4f6]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                        <path className="stroke-[#00685f]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="75, 100" strokeWidth="3"></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold text-[#191c1e]">75%</span>
                        <span className="text-[10px] uppercase text-[#565e74] font-bold tracking-widest">Target</span>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-[#565e74] font-medium">Total Revenue</span>
                    <span className="font-bold text-[#191c1e]">$12,450</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-[#565e74] font-medium">Cost per Lead</span>
                    <span className="font-bold text-[#191c1e]">$1.12</span>
                </div>
            </div>
        </div>
    </section>
);

export default function DashboardPage() {
    const [state, setState] = useState<DashboardState>('LOADING');
    const [isConnected, setIsConnected] = useState(false);
    const [activeAutomationsCount, setActiveAutomationsCount] = useState(0);
    const [hasReels, setHasReels] = useState(false);

    const [selectedReel, setSelectedReel] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const checkState = async () => {
        try {
            const statusRes = await fetch(`${API_BASE_URL}/api/config/status`);
            const statusData = await statusRes.json();

            if (!statusData.instagram_connected) {
                setState('NEW_USER');
                return;
            }
            setIsConnected(true);

            const statsRes = await fetch(`${API_BASE_URL}/api/stats`);
            const statsData = await statsRes.json();
            setActiveAutomationsCount(statsData.active_automations);

            if (statsData.active_automations > 0) {
                setState('ACTIVE');
                return;
            }

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
            setState('NEW_USER'); 
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
        checkState();
    };

    if (state === 'LOADING') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-[#00685f] animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {state !== 'NEW_USER' && (
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold font-headline tracking-tight text-[#191c1e]">Instagram Analytics</h2>
                        <p className="text-[#565e74] mt-1 font-medium">Performance overview for the last 30 days</p>
                    </div>
                    <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-xl">
                        <button className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#ffffff] shadow-sm text-[#00685f]">Monthly</button>
                        <button className="px-4 py-1.5 text-xs font-semibold rounded-lg text-[#565e74] hover:bg-[#e6e8ea] transition-colors">Weekly</button>
                    </div>
                </div>
            )}

            {state !== 'NEW_USER' && <StatsCards />}

            {state === 'NEW_USER' && (
                <ConnectHero />
            )}

            {state === 'CONNECTED_NO_REELS' && (
                <FetchReelsCard onFetchComplete={checkState} />
            )}

            {state === 'ACTIVATION' && (
                <div className="space-y-6">
                    <div className="bg-[#ffffff] border border-[#c3c5d9]/30 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-[#191c1e] mb-2 font-headline tracking-tight">🚀 Let's set up your first automation</h2>
                        <p className="text-[#434656] mb-6 font-medium">Select a reel below to start converting comments into leads.</p>
                        <ReelGrid onSelectReel={handleReelSelect} selectedReelId={selectedReel?.id} />
                    </div>
                </div>
            )}

            {state === 'ACTIVE' && (
                <>
                    <ChartAndROI />
                    
                    <div className="space-y-6 mt-12">
                        <AutomationList />
                    </div>
                </>
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
