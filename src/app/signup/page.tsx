'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/instagram');
    }, [router]);

    return (
        <div className="min-h-screen bg-[#282828] flex items-center justify-center p-4">
            <div className="text-white/50">Redirecting to Dashboard...</div>
        </div>
    );
}
