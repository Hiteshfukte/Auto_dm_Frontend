import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#f7f9fb] font-body text-[#191c1e]">
            <Sidebar />
            
            <div className="flex-1 ml-64 flex flex-col min-h-screen relative w-[calc(100%-16rem)]">
                <header className="h-16 sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 w-full">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-full max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                            <input className="w-full bg-[#e6e8ea] border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#00685f]/20 transition-all outline-none" placeholder="Search analytics..." type="text"/>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 text-slate-500">
                            <button className="hover:bg-slate-100 p-2 rounded-lg transition-colors relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-[#00685f] rounded-full border-2 border-white"></span>
                            </button>
                            <button className="hover:bg-slate-100 p-2 rounded-lg transition-colors">
                                <span className="material-symbols-outlined">help</span>
                            </button>
                        </div>
                        <button className="bg-gradient-to-br from-[#00685f] to-[#008378] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-[#00685f]/20 hover:scale-[0.98] transition-transform flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">add</span>
                            New Automation
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-[#191c1e] font-headline">Alex Chen</p>
                                <p className="text-xs text-[#565e74]">Admin</p>
                            </div>
                            <img className="w-10 h-10 rounded-full border-2 border-[#00685f]/10 object-cover" alt="profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBiRcDmizzvIq4_rsJ2R1WKxZHroafSRNsfzFBz-xq7h89Wqya-2w6zGJ8qhNGPotyd6nY8N66toQema7yaEW-5t5uSCtDbC7vawY1Y6gh7moEzUu4h0UtZyoqNBkpm7Kl5kNY2hm8_OI-hlpkrpm-cQS159ll0yXSEJCLibcIKawXgUsg_-BaFWBLnHFDfN3BADWfrNO4oQoCFSaDKmcP8XWbMHSywm3VyWWoTlVvQLVSDO_x6zCpeA6mTjqWEBJsO0r2mJhUlr0E"/>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-auto relative">
                    <div className="max-w-7xl mx-auto space-y-8 relative z-10 w-full pb-20">
                        {children}
                    </div>
                </main>
            </div>

            <div className="fixed bottom-6 left-[calc(50%+8rem)] transform -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-[#00685f]/20 rounded-full px-6 py-3 flex items-center gap-6 shadow-[0px_20px_40px_rgba(0,104,95,0.08)] z-[60]">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00685f] animate-pulse"></span>
                    <span className="text-sm font-bold tracking-tight">System Status: Optimal</span>
                </div>
                <div className="h-4 w-[1px] bg-[#bcc9c6]/30"></div>
                <div className="flex gap-4">
                    <button className="text-xs font-bold uppercase tracking-widest text-[#565e74] hover:text-[#00685f] transition-colors">Quick Logs</button>
                    <button className="text-xs font-bold uppercase tracking-widest text-[#565e74] hover:text-[#00685f] transition-colors">Refresh Data</button>
                </div>
            </div>
        </div>
    );
}
