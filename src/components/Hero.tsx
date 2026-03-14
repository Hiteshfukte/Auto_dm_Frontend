'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll Progress: 0 to 1
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Map scroll (0-1) to frame index (0-191)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, 192]);

    // Preload Images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            for (let i = 1; i <= 192; i++) {
                const img = new Image();
                const filename = i.toString().padStart(4, '0') + '.jpg';
                img.src = `/sequence/${filename}`;
                await new Promise((resolve) => {
                    img.onload = resolve;
                });
                loadedImages.push(img);
            }

            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Render Loop
    useEffect(() => {
        if (!isLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateSize = () => {
            // High-DPI Support
            const dpr = window.devicePixelRatio || 1;

            // We want the canvas to fill the container, not the window
            // But since the container is sticky h-screen, it effectively matches window height mostly, 
            // but width might be constrained.
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Allow CSS to determine display size usually, but we need drawing buffer size
        };

        // Initial sizing
        updateSize();
        window.addEventListener('resize', updateSize);

        const render = () => {
            const currentFrame = Math.round(frameIndex.get()) - 1;
            const img = images[currentFrame] || images[0];

            if (img) {
                // Calculate Scale to cover
                // Note: canvas.width is now physical pixels
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', updateSize);
        }
    }, [isLoaded, frameIndex, images]);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-[#282828]">
            <div className="sticky top-0 h-screen w-full flex items-start justify-center p-4 md:p-8 pt-64">

                {/* Rounded Container for Canvas (6:4 Ratio) */}
                <div className="relative w-full max-w-[95vw] aspect-[7/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-[#1a1a1a]">

                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center text-white/50">
                            Loading Experience...
                        </div>
                    )}

                    <canvas ref={canvasRef} className="w-full h-full object-cover" />

                    {/* Overlay Content - Bottom Left */}
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                        className="absolute bottom-16 left-8 md:left-16 flex flex-col items-start justify-end text-white pointer-events-none z-10"
                    >
                        <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter leading-none drop-shadow-xl">
                            CHAOS
                        </h1>
                        <p className="text-xl md:text-3xl text-white/90 font-light drop-shadow-lg max-w-lg">
                            Is your inbox a mess? <br />
                            Stop drowning in DMs.
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]) }}
                        className="absolute bottom-16 left-8 md:left-16 flex flex-col items-start justify-end text-white pointer-events-none z-10"
                    >
                        <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-xl">
                            ZEN.
                        </h1>
                        <p className="text-xl md:text-3xl text-white/90 font-light drop-shadow-lg max-w-lg">
                            Automate your growth.<br />
                            Turn comments into cash.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
