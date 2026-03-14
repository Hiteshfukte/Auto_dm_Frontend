'use client';

import { motion } from 'framer-motion';
import { User, Bell, Shield, CreditCard, ChevronRight } from 'lucide-react';

const settingsSections = [
    {
        title: 'Account',
        icon: User,
        items: [
            { name: 'Profile', description: 'Update your name and email' },
            { name: 'Password', description: 'Change your password' },
        ],
    },
    {
        title: 'Notifications',
        icon: Bell,
        items: [
            { name: 'Email Notifications', description: 'Daily reports and alerts' },
            { name: 'Push Notifications', description: 'Browser notifications' },
        ],
    },
    {
        title: 'Billing',
        icon: CreditCard,
        items: [
            { name: 'Subscription', description: 'Free Plan' },
            { name: 'Payment Method', description: 'No card on file' },
        ],
    },
];

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-white/50 mt-1">
                    Manage your account and preferences.
                </p>
            </div>

            {/* Settings Sections */}
            {settingsSections.map((section, idx) => (
                <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                    <div className="flex items-center gap-3 p-6 border-b border-white/10">
                        <section.icon className="w-5 h-5 text-purple-400" />
                        <h2 className="text-lg font-bold text-white">{section.title}</h2>
                    </div>

                    <div className="divide-y divide-white/10">
                        {section.items.map((item) => (
                            <button
                                key={item.name}
                                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
                            >
                                <div>
                                    <p className="text-white font-medium">{item.name}</p>
                                    <p className="text-white/50 text-sm">{item.description}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-white/30" />
                            </button>
                        ))}
                    </div>
                </motion.div>
            ))}

            {/* Danger Zone */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6"
            >
                <h3 className="text-lg font-bold text-red-400 mb-2">Danger Zone</h3>
                <p className="text-white/60 text-sm mb-4">
                    Permanently delete your account and all associated data.
                </p>
                <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-colors">
                    Delete Account
                </button>
            </motion.div>
        </div>
    );
}
