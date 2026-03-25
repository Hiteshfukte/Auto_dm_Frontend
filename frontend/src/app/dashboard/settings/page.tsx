import { motion } from 'framer-motion';
import { User, Bell, CreditCard, ChevronRight } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    const fullName = user?.user_metadata?.full_name || "Platform User";
    const email = user?.email || "No email available";

    const settingsSections = [
        {
            title: 'Account Profile',
            icon: User,
            items: [
                { name: 'Name', description: fullName },
                { name: 'Email Address', description: email },
            ],
        },
        {
            title: 'Notifications',
            icon: Bell,
            items: [
                { name: 'Email Notifications', description: 'Daily reports and alerts limits' },
                { name: 'Push Notifications', description: 'Browser notifications allowed' },
            ],
        },
        {
            title: 'Billing & Plan',
            icon: CreditCard,
            items: [
                { name: 'Current Plan', description: 'Enterprise Beta (Free)' },
                { name: 'Payment Method', description: 'No card on file needed' },
            ],
        },
    ];

    return (
        <div className="space-y-8 max-w-4xl mx-auto mt-4 relative z-10">
            {/* Header */}
            <header className="relative z-10">
                <h1 className="text-4xl font-extrabold text-[#191c1e] font-headline mb-3 tracking-tight">Settings</h1>
                <p className="text-[#565e74] text-lg font-medium">Manage your account and preferences.</p>
            </header>

            {/* Settings Sections */}
            {settingsSections.map((section, idx) => (
                <div
                    key={section.title}
                    className="bg-[#ffffff] border border-[#c3c5d9]/30 rounded-3xl overflow-hidden shadow-[0px_20px_40px_rgba(0,104,95,0.06)]"
                >
                    <div className="flex items-center gap-4 p-6 border-b border-[#e6e8ea]">
                        <div className="p-3 bg-[#6bd8cb]/20 rounded-xl">
                            <section.icon className="w-5 h-5 text-[#00685f]" />
                        </div>
                        <h2 className="text-xl font-bold text-[#191c1e] font-headline tracking-tight">{section.title}</h2>
                    </div>

                    <div className="divide-y divide-[#e6e8ea]">
                        {section.items.map((item) => (
                            <button
                                key={item.name}
                                className="w-full flex items-center justify-between p-6 hover:bg-[#f2f4f6]/50 transition-colors text-left group"
                            >
                                <div>
                                    <p className="text-[#191c1e] font-bold text-[15px]">{item.name}</p>
                                    <p className="text-[#565e74] text-sm font-medium mt-1">{item.description}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-[#f2f4f6] flex items-center justify-center group-hover:bg-[#00685f] group-hover:text-white transition-colors text-[#565e74]">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold text-red-600 mb-2 font-headline tracking-tight">Danger Zone</h3>
                    <p className="text-red-900/60 text-sm font-medium">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                </div>
                <button className="bg-white border border-red-200 text-red-600 px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition-colors whitespace-nowrap shadow-sm">
                    Delete Account
                </button>
            </div>
        </div>
    );
}
