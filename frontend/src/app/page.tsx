'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Network } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Constellation Background Component
const ConstellationBackground = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base dark gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#111827_0%,#030712_100%)]" />
            
            {/* Glowing orbs */}
            <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-1000" />
            <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-1000 delay-500" />
            
            {/* SVG Constellation lines (Static simulation for stability) */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#34d399" strokeWidth="1" fill="none">
                    <circle cx="15%" cy="25%" r="2" fill="#34d399" />
                    <circle cx="25%" cy="15%" r="1" fill="#34d399" />
                    <line x1="15%" y1="25%" x2="25%" y2="15%" />
                    
                    <circle cx="85%" cy="30%" r="2" fill="#818cf8" />
                    <circle cx="75%" cy="40%" r="1" fill="#818cf8" />
                    <line x1="85%" y1="30%" x2="75%" y2="40%" />
                    
                    <circle cx="10%" cy="70%" r="1.5" fill="#22d3ee" />
                    <circle cx="20%" cy="80%" r="1" fill="#22d3ee" />
                    <line x1="10%" y1="70%" x2="20%" y2="80%" />
                    
                    <circle cx="80%" cy="85%" r="2" fill="#34d399" />
                    <circle cx="90%" cy="75%" r="1" fill="#34d399" />
                    <line x1="80%" y1="85%" x2="90%" y2="75%" />
                </g>
            </svg>
        </div>
    );
};

export default function Home() {
    return (
        <main className="relative min-h-screen bg-[#030712] flex flex-col font-sans selection:bg-emerald-500/30 text-white">
            <ConstellationBackground />

            {/* Navbar */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <Network className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">AirbnbAI</span>
                </div>
                <div className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/5">
                    <Link href="/" className="text-sm font-medium text-emerald-400">Home</Link>
                    <Link href="/dashboard/predict" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Predict</Link>
                    <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                </div>
            </nav>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-24 max-w-5xl mx-auto w-full text-center">
                
                {/* Top Badge */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-12"
                >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-slate-300 font-medium">Gradient-boosted ensemble · R² 0.874</span>
                </motion.div>

                {/* Headline */}
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
                >
                    Find your perfect stay at the<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400">perfect</span> price.
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed"
                >
                    StayWise AI analyzes thousands of listings to predict the fairest price, ensuring you never overpay for your dream vacation.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-24"
                >
                    <Link href="/dashboard/predict">
                        <button className="px-8 py-4 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold flex items-center gap-2 transition-all hover:scale-105">
                            Run a prediction <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                    <Link href="/dashboard">
                        <button className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105">
                            Explore analytics
                        </button>
                    </Link>
                </motion.div>

                {/* Stats Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
                >
                    <div className="bg-white/5 border border-white/5 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/10 transition-colors text-left">
                        <div className="text-4xl font-bold text-indigo-400 mb-2">48,412</div>
                        <div className="text-sm text-slate-400 font-medium">Listings in training set</div>
                    </div>
                    <div className="bg-white/5 border border-white/5 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/10 transition-colors text-left">
                        <div className="text-4xl font-bold text-indigo-400 mb-2">21.4</div>
                        <div className="text-sm text-slate-400 font-medium">Mean absolute error (USD)</div>
                    </div>
                    <div className="bg-white/5 border border-white/5 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/10 transition-colors text-left">
                        <div className="text-4xl font-bold text-indigo-400 mb-2">&lt; 40 ms</div>
                        <div className="text-sm text-slate-400 font-medium">Median inference latency</div>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}
