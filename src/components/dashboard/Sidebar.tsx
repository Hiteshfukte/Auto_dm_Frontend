'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Zap, Settings, LogOut, Instagram } from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Automations', href: '/dashboard/automations', icon: Zap },
    { name: 'Instagram', href: '/dashboard/instagram', icon: Instagram },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#1f1f1f] border-r border-white/10 min-h-screen flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <Link href="/dashboard" className="text-2xl font-bold text-white">
                    AutoDM
                </Link>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                    ? 'bg-purple-500/20 text-purple-400'
                                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <form action="/api/auth/signout" method="post">
                    <button
                        type="submit"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </form>
            </div>
        </aside>
    );
}
