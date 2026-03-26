'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, 
    ArrowRight, 
    ExternalLink, 
    Key, 
    Instagram, 
    Info, 
    Loader2, 
    Copy,
    ShieldCheck
} from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface WizardProps {
    onComplete: () => void;
}

export default function InstagramWizard({ onComplete }: WizardProps) {
    const [step, setStep] = useState(1);
    const [token, setToken] = useState('');
    const [businessId, setBusinessId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConnect = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiFetch('/api/config/connect', {
                method: 'POST',
                body: JSON.stringify({
                    access_token: token,
                    business_id: businessId
                })
            });

            if (!res.ok) throw new Error("Connection failed. Please check your credentials.");
            
            setStep(3);
            setTimeout(() => {
                onComplete();
            }, 2500);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-12 relative px-2">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#e6e8ea] -translate-y-1/2 -z-10"></div>
                <div 
                    className="absolute top-1/2 left-0 h-1 bg-[#00685f] -translate-y-1/2 -z-10 transition-all duration-500"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
                
                {[1, 2, 3].map((s) => (
                    <div 
                        key={s}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                            s <= step 
                            ? 'bg-[#00685f] text-white shadow-lg' 
                            : 'bg-[#ffffff] text-[#565e74] border-2 border-[#e6e8ea]'
                        }`}
                    >
                        {s < step ? <CheckCircle2 className="w-6 h-6" /> : s}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-[#ffffff] border border-[#c3c5d9]/30 rounded-3xl p-8 shadow-xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#00685f]/10 rounded-2xl flex items-center justify-center text-[#00685f]">
                                <Info className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-[#191c1e] font-headline tracking-tight">Step 1: Setup Instagram</h2>
                        </div>
                        
                        <div className="space-y-6 mb-10">
                            <p className="text-[#434656] font-medium leading-relaxed">
                                To bypass Meta's app review process and start immediately, you need to provide a manual 
                                <strong> Instagram Graph Access Token (IGAA)</strong>. Follow these quick steps:
                            </p>
                            
                            <ul className="space-y-4">
                                {[
                                    { text: "Open Meta for Developers & select your Business App.", icon: <ExternalLink className="w-4 h-4" /> },
                                    { text: "Go to User Settings -> Instagram Graph API -> Get Token.", icon: <Key className="w-4 h-4" /> },
                                    { text: "Copy your IG_ACCESS_TOKEN and your Business ID.", icon: <Copy className="w-4 h-4" /> }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 p-4 bg-[#f7f9fb] rounded-xl border border-[#e6e8ea]">
                                        <div className="text-[#00685f] mt-0.5">{item.icon}</div>
                                        <span className="text-sm font-semibold text-[#191c1e]">{item.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-800 font-medium">
                                    Your token is stored securely in your private vault. We never share your credentials.
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={() => setStep(2)}
                            className="w-full bg-gradient-to-br from-[#00685f] to-[#008378] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#00685f]/20"
                        >
                            I have my credentials <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-[#ffffff] border border-[#c3c5d9]/30 rounded-3xl p-8 shadow-xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-[#00685f]/10 rounded-2xl flex items-center justify-center text-[#00685f]">
                                <Instagram className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-[#191c1e] font-headline tracking-tight">Step 2: Connect Account</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[#191c1e] text-sm font-extrabold mb-2">Instagram Access Token (IGAA...)</label>
                                <input 
                                    type="password"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    placeholder="Paste your long-lived token here"
                                    className="w-full bg-[#f7f9fb] border border-[#c3c5d9]/50 rounded-xl py-4 px-5 text-[#191c1e] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] transition-all font-mono text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-[#191c1e] text-sm font-extrabold mb-2">Instagram Business ID</label>
                                <input 
                                    type="text"
                                    value={businessId}
                                    onChange={(e) => setBusinessId(e.target.value)}
                                    placeholder="e.g., 178414000000000"
                                    className="w-full bg-[#f7f9fb] border border-[#c3c5d9]/50 rounded-xl py-4 px-5 text-[#191c1e] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] transition-all"
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <button 
                                    onClick={() => setStep(1)}
                                    disabled={loading}
                                    className="px-6 py-4 rounded-xl font-bold text-[#565e74] bg-[#f2f4f6] hover:bg-[#e6e8ea] transition-colors"
                                >
                                    Back
                                </button>
                                <button 
                                    onClick={handleConnect}
                                    disabled={loading || !token || !businessId}
                                    className="flex-1 bg-[#00685f] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#005a52] transition-colors disabled:opacity-50 shadow-lg shadow-[#00685f]/20"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Connect"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#ffffff] border border-[#c3c5d9]/30 rounded-3xl p-12 shadow-xl text-center"
                    >
                        <div className="w-20 h-20 bg-[#00685f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#00685f]/30">
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-[#191c1e] font-headline tracking-tight mb-3">You're Connected!</h2>
                        <p className="text-[#565e74] font-medium text-lg mb-8">
                            Your Instagram account is now linked. Redirecting you to your dashboard...
                        </p>
                        <div className="w-full bg-[#f2f4f6] h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2 }}
                                className="h-full bg-[#00685f]"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
