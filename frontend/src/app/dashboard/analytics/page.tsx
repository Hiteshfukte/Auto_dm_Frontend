import { BarChart3 } from 'lucide-react';

export default function AnalyticsPlaceholder() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto space-y-6">
            <div className="w-24 h-24 bg-[#e6e8ea] rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-10 h-10 text-[#565e74]" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#191c1e] font-headline tracking-tight">Advanced Analytics Coming Soon</h1>
            <p className="text-lg text-[#565e74] font-medium leading-relaxed">
                We are building powerful new reporting tools to give you deeper insights into your automated DM campaigns and conversion rates. Stay tuned!
            </p>
            <div className="mt-8 px-6 py-2 bg-[#f2f4f6] text-[#565e74] rounded-full text-sm font-bold tracking-widest uppercase">
                Under Construction
            </div>
        </div>
    );
}
