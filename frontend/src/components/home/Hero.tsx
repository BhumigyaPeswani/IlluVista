'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background (Placeholder for 3D Canvas later) */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm md:text-base tracking-[0.2em] uppercase mb-4 text-white/80"
                >
                    Curated Digital Masterpieces
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-8 leading-tight"
                >
                    Art Beyond <br /> <span className="italic text-accent">Boundaries</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <Link
                        href="/gallery"
                        className="px-8 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 min-w-[160px]"
                    >
                        Enter Gallery
                    </Link>
                    <Link
                        href="/about"
                        className="px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 min-w-[160px] backdrop-blur-sm"
                    >
                        Our Story
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent mx-auto"></div>
            </motion.div>
        </section>
    );
}
