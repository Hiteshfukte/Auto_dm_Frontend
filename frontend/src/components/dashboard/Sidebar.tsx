'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
        { name: 'Automations', href: '/dashboard/automations', icon: 'bolt' },
        { name: 'Instagram', href: '/dashboard/instagram', icon: 'smartphone' },
        { name: 'Analytics', href: '/dashboard/analytics', icon: 'insights' },
        { name: 'Settings', href: '/dashboard/settings', icon: 'settings' },
    ];

    return (
        <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-slate-950 border-r border-slate-800 shadow-2xl shadow-teal-900/10 z-50">
            <div className="flex flex-col h-full py-6">
                <div className="px-6 mb-10">
                    <h1 className="text-xl font-bold tracking-tight text-white font-headline">AutoDmPro</h1>
                    <p className="text-xs text-[#6bd8cb]/80 font-bold tracking-widest uppercase mt-1">Enterprise</p>
                </div>
                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href} 
                                className={`flex items-center gap-3 px-4 py-3 font-bold transition-all duration-200 ${isActive ? 'text-[#6bd8cb] bg-[#00685f]/20 border-r-4 border-[#6bd8cb]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="font-body text-sm tracking-wide">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="mt-auto pt-6 border-t border-slate-800">
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors font-bold">
                        <span className="material-symbols-outlined">help</span>
                        <span className="font-body text-sm tracking-wide">Support</span>
                    </Link>
                    <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors font-bold">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="font-body text-sm tracking-wide">Logout</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
