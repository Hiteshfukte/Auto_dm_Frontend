'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
    useEffect(() => {
        const container = document.getElementById('mouse-trail-container');
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            container.appendChild(dot);
            
            requestAnimationFrame(() => {
                const offsetX = (Math.random() - 0.5) * 40;
                const offsetY = (Math.random() - 0.5) * 40 - 20;
                dot.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0)`;
                dot.style.opacity = '0';
            });
            setTimeout(() => dot.remove(), 600);
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="bg-[#f7f9fb] font-body text-[#191c1e] antialiased">
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-none">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tighter text-slate-800 dark:text-white font-headline">AutoDM Pro</div>
                    <div className="hidden md:flex items-center gap-8">
                        <a className="text-slate-900 dark:text-white font-semibold border-b-2 border-slate-900 dark:border-white pb-1 font-headline tracking-tight text-sm" href="#">Features</a>
                        <a className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-headline tracking-tight text-sm font-medium" href="#features">How it Works</a>
                        <a className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-headline tracking-tight text-sm font-medium" href="#">Pricing</a>
                        <a className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-headline tracking-tight text-sm font-medium" href="#">Testimonials</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="px-6 py-2.5 bg-[#006a61] text-[#ffffff] font-medium rounded-lg hover:opacity-80 transition-opacity duration-300 active:scale-95 transition-transform text-sm">
                            Dashboard Login
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-20">
                <section className="relative hero-gradient overflow-hidden pt-20 pb-32">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-semibold mb-6">
                                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                NEXT-GEN INSTAGRAM AUTOMATION
                            </div>
                            <h1 className="text-6xl font-extrabold font-headline leading-[1.1] text-[#191c1e] mb-6 tracking-tighter">
                                The Digital <span className="text-[#006a61]">Concierge</span> for High-Growth Brands.
                            </h1>
                            <p className="text-xl text-[#434656] max-w-xl mb-10 leading-relaxed">
                                Scale your Instagram DMs without losing the human touch. AutoDM Pro uses sophisticated AI to manage inquiries, book appointments, and nurture leads 24/7.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="cta-gradient px-8 py-4 text-[#ffffff] font-semibold rounded-lg shadow-xl shadow-slate-500/20 hover:scale-[1.02] transition-transform">
                                    Get Started for Free
                                </Link>
                                <button className="px-8 py-4 text-[#464e63] font-semibold flex items-center gap-2 hover:bg-[#f2f4f6] rounded-lg transition-colors">
                                    <span className="material-symbols-outlined">play_circle</span>
                                    Watch Product Tour
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="relative z-10 w-full max-w-[600px] aspect-[4/3]">
                                <img alt="Enterprise Dashboard" className="rounded-2xl shadow-2xl border border-white/20 transform rotate-1 lg:-rotate-2 scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVT2jGWp94w2jsIMZw9CB7hq_8aLUMyy1iFpW_W_ZjtEHWMdJ4lshTKy6bXPOLWQFFfLXXE1SJCr87HyiwG_LFE-tCKX21Q-hYVfQt5pem18sC5Oj2yHN_7SLu_FLTlrBQlKdxo5_UI3ti8R2OhP5DltkqwUePnrCX-PJ8N--cHdByp0vIreEpRP3PyMLlssLx4FIwbQxDtJnYcvVyiQka6RlIBfIDLKxfhJkh-rAWOh2HRKlXoAv1ZCf5KCBSkodAC-XUuWpatRTg"/>
                                <img alt="Mobile App" className="absolute -bottom-12 -left-12 w-48 rounded-[2.5rem] border-8 border-slate-900 shadow-2xl hidden md:block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDK9h0Vshp_OktpPZoTsxkkz3UZVJYAn0oRHK39udJ28f_9oYy28hsmVKbnpA0vmckszfUOfA5aFCGudsVtHwSsDx8LIMocWiYfrM9PbvqQbYJSzX8q8de__oB5HlGDjw2NMvXhwuLIHEamc_vtH7nYgIva2NGx9tG4rBLpaTHaIC0YLZ6cHQqAtumf1ylN-hiuRFb-JJ5BNMWupr1gytEGHwKCBEiY1PmMKA_sJFjht9UUyrcakH8KOKq8LCc05foruN8vdU8kaFE"/>
                            </div>
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#006a61]/10 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">Trusted by 500+ global enterprises</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="font-headline font-black text-2xl tracking-tighter text-slate-800">stripe</div>
                            <div className="font-headline font-black text-2xl tracking-tighter text-slate-800">Q airbnb</div>
                            <div className="font-headline font-black text-2xl tracking-tighter text-slate-800">shopify</div>
                            <div className="font-headline font-black text-2xl tracking-tighter text-slate-800">slack</div>
                            <div className="font-headline font-black text-2xl tracking-tighter text-slate-800">INTERCOM</div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-[#f2f4f6]" id="features">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-extrabold font-headline tracking-tight mb-4 text-[#191c1e]">Master Your Communications</h2>
                            <p className="text-[#434656] max-w-2xl mx-auto">Sophisticated tools built for enterprise-grade social media management.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                            <div className="md:col-span-8 bg-[#ffffff] rounded-3xl p-10 flex flex-col justify-between overflow-hidden relative group">
                                <div className="relative z-10 max-w-sm">
                                    <span className="material-symbols-outlined text-[#006a61] text-4xl mb-6">forum</span>
                                    <h3 className="text-2xl font-bold mb-4 text-[#191c1e]">Intelligent Inbound Nurturing</h3>
                                    <p className="text-[#434656]">Our AI recognizes intent and sentiment, providing contextually relevant responses that move prospects down the funnel.</p>
                                </div>
                                <div className="absolute right-0 bottom-0 w-2/3 transform translate-x-12 translate-y-12 group-hover:-translate-y-4 transition-transform duration-500">
                                    <img alt="Analytics" className="rounded-tl-2xl shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4omdLOshAl7ehrRdaGAsFpmsjbr3bFmT4hB0lNWpSAWegtpiB153J0qWE7Z953Nb2sIJYcO6lIKjnAK8awbuviKZUQJjxmZaDp1uQ6D6bDp4cHz5Jcch36Ot5IkTOesc2hZTrhZTdER0DrRR9_WwSW7sWF74lGOfIPlzfDhvwWovUOZIWU79KucM8L3CcDPK31o_jKPFc5xIs2QS7NGhDEhSKJ-DU-JPhv1hviidy2jRtDUMvArI-Sxcf9mEZ0VJVQEDzwMgq4DYR" />
                                </div>
                            </div>
                            <div className="md:col-span-4 bg-[#006a61] p-8 rounded-3xl text-white flex flex-col justify-end">
                                <span className="material-symbols-outlined text-4xl mb-6">bolt</span>
                                <h3 className="text-xl font-bold mb-2">Instant Triggers</h3>
                                <p className="text-white/80 text-sm">Automate replies to comments, story mentions, and keyword-based DMs in milliseconds.</p>
                            </div>
                            <div className="md:col-span-4 bg-[#e0e3e5] p-8 rounded-3xl flex flex-col justify-between">
                                <div>
                                    <span className="material-symbols-outlined text-[#464e63] text-4xl mb-6">account_tree</span>
                                    <h3 className="text-xl font-bold mb-2 text-[#191c1e]">Visual Flow Builder</h3>
                                </div>
                                <p className="text-[#434656] text-sm">Design complex multi-step automation sequences with a simple drag-and-drop interface.</p>
                            </div>
                            <div className="md:col-span-8 bg-white p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10">
                                <div className="flex-1">
                                    <span className="material-symbols-outlined text-[#735c00] text-4xl mb-6">security</span>
                                    <h3 className="text-2xl font-bold mb-4 text-[#191c1e]">Enterprise Security</h3>
                                    <p className="text-[#434656]">SOC2 Type II compliant with dedicated account managers and 99.9% uptime SLA for peace of mind.</p>
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <div className="bg-[#eceef0] rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-bold text-[#006a61]">99.9%</div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Uptime</div>
                                    </div>
                                    <div className="bg-[#eceef0] rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-bold text-[#006a61]">256-bit</div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Encryption</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 order-2 lg:order-1">
                            <div className="bg-[#f2f4f6] rounded-[2rem] p-8 max-w-md mx-auto shadow-2xl relative">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#c3c5d9]/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                                        <div>
                                            <div className="font-bold text-sm text-[#191c1e]">Sarah Jenkins</div>
                                            <div className="text-[10px] text-green-600 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Online
                                            </div>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">more_horiz</span>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex justify-start">
                                        <div className="bg-[#ffffff] text-[#191c1e] p-4 rounded-2xl rounded-bl-none max-w-[80%] text-sm shadow-sm border border-slate-100">
                                            Hi! I'm interested in your premium collection. Do you have any stock left in the New York store?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[#006a61] text-[#ffffff] p-4 rounded-2xl rounded-br-none max-w-[80%] text-sm shadow-lg">
                                            Hello Sarah! 👋 Our Soho flagship currently has 5 units available. Would you like me to reserve one for you?
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-[#ffffff] text-[#191c1e] p-4 rounded-2xl rounded-bl-none max-w-[80%] text-sm shadow-sm border border-slate-100">
                                            Yes please! That would be amazing.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 order-1 lg:order-2">
                            <h2 className="text-4xl font-extrabold font-headline mb-6 text-[#191c1e]">Real Conversations. <br/><span className="text-[#006a61]">Zero Friction.</span></h2>
                            <p className="text-xl text-[#434656] mb-8 leading-relaxed">
                                Don't let your customers wait. AutoDM Pro identifies hot leads and provides real-time concierge service that converts at 3x higher rates than standard landing pages.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#006a61]">check_circle</span><span className="font-medium text-[#191c1e]">Sentiment-aware replies</span></li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#006a61]">check_circle</span><span className="font-medium text-[#191c1e]">Direct payment link generation</span></li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#006a61]">check_circle</span><span className="font-medium text-[#191c1e]">Seamless handover to human agents</span></li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                <section className="py-32">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="cta-gradient rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-8 tracking-tight">Ready to transform your Instagram presence?</h2>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                    <button className="px-10 py-5 bg-white text-[#464e63] font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg">Start Your Free 14-Day Trial</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full py-12 px-6 mt-20 bg-slate-950 border-t border-slate-800 text-center">
                <div className="text-lg font-bold text-slate-100 font-headline mb-2">AutoDM Pro</div>
                <p className="text-slate-400 font-body text-xs tracking-wide">
                    © 2026 AutoDM Pro. All rights reserved. Built with Next.js & Tailwind CSS.
                </p>
            </footer>

            <div className="fixed inset-0 pointer-events-none z-[9999]" id="mouse-trail-container"></div>
        </div>
    );
}
