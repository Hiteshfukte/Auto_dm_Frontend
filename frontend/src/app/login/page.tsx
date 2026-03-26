'use client';

import { motion } from 'framer-motion';
import { Instagram, ArrowRight, Sparkles, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');

    const handleGoogleLogin = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const supabase = createClient();

        try {
            if (mode === 'signin') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push('/dashboard');
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                });
                if (error) throw error;
                setError("Check your email for the confirmation link!");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Animated Background Glows */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[20%] w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]"
            />
            <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]"
            />

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-10 border border-white/10 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
            >
                <div className="absolute -top-12 -right-12 text-purple-500/20">
                    <Sparkles className="w-32 h-32" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-purple-500/25 border border-white/20"
                >
                    <Instagram className="w-12 h-12 text-white" />
                </motion.div>

                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-3 tracking-tight">
                    AutoDM
                </h1>
                <p className="text-white/50 mb-10 leading-relaxed text-sm">
                    Supercharge your Instagram Business with intelligent, automated direct messages and comment replies.
                </p>

                <button
                    onClick={handleGoogleLogin}
                    className="group relative flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all w-full shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-1"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.15.77-2.61 1.23-4.14 1.23-3.13 0-5.78-2.11-6.72-4.95H1.18v2.86C3.15 20.67 7.23 23 12 23z" />
                        <path fill="#FBBC05" d="M5.28 13.85c-.24-.71-.38-1.47-.38-2.25s.14-1.54.38-2.25V6.49H1.18C.43 8.01 0 9.94 0 12s.43 3.99 1.18 5.51l4.1-2.66z" />
                        <path fill="#EA4335" d="M12 4.8c1.61 0 3.06.55 4.2 1.63l3.15-3.15C17.45 1.48 14.97 0 12 0 7.23 0 3.15 2.33 1.18 6.49l4.1 2.86C6.22 6.91 8.87 4.8 12 4.8z" />
                    </svg>
                    Continue with Google
                </button>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#0a0a0a] px-4 text-white/30 font-bold tracking-widest">or continue with email</span>
                    </div>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all"
                            required
                        />
                    </div>

                    {error && (
                        <p className={`text-sm font-medium ${error.includes('confirmation') ? 'text-green-400' : 'text-red-400'}`}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {loading ? 'Processing...' : (
                            <>
                                {mode === 'signin' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                                {mode === 'signin' ? 'Sign In' : 'Create Account'}
                            </>
                        )}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                        className="text-white/40 text-sm hover:text-white transition-colors mt-2"
                    >
                        {mode === 'signin' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-white/30 text-xs font-medium uppercase tracking-widest">
                        Powered by official Meta Graph API
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
