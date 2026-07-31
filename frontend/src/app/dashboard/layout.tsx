'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Home, Calendar, Wallet, Settings, LogOut, Search, PlusCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', roles: ['Admin', 'Host', 'Guest'] },
    { name: 'My Properties', icon: Home, href: '/dashboard/properties', roles: ['Host'] },
    { name: 'Add Property', icon: PlusCircle, href: '/dashboard/properties/new', roles: ['Host'] },
    { name: 'Predict Rate', icon: Sparkles, href: '/dashboard/predict', roles: ['Host', 'Guest'] },
    { name: 'Explore', icon: Search, href: '/dashboard/explore', roles: ['Guest'] },
    { name: 'Bookings', icon: Calendar, href: '/dashboard/bookings', roles: ['Host', 'Guest'] },
    { name: 'Earnings', icon: Wallet, href: '/dashboard/earnings', roles: ['Host'] },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings', roles: ['Admin', 'Host', 'Guest'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [role, setRole] = useState<'Host' | 'Guest'>('Host'); // Mock role for preview
    const [userInitials, setUserInitials] = useState('JD');

    useEffect(() => {
        const loadUserInitials = () => {
            try {
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    const nameParts = user.name ? user.name.split(' ') : [];
                    const first = user.firstName || nameParts[0] || '';
                    const last = user.lastName || nameParts.slice(1).join(' ') || '';
                    if (first || last) {
                        const initials = `${first.charAt(0)}${last ? last.charAt(0) : ''}`.toUpperCase();
                        setUserInitials(initials || 'U');
                    }
                }
            } catch (e) {}
        };

        loadUserInitials();
        window.addEventListener('user-updated', loadUserInitials);
        
        return () => window.removeEventListener('user-updated', loadUserInitials);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col">
                <div className="p-6">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        AirbnbAI
                    </Link>
                </div>

                {/* Role Switcher (For demo purposes) */}
                <div className="px-6 pb-4">
                    <div className="flex bg-black/40 p-1 rounded-lg">
                        <button 
                            onClick={() => setRole('Guest')}
                            className={`flex-1 text-xs py-1.5 rounded-md ${role === 'Guest' ? 'bg-white/10 text-white' : 'text-slate-500'}`}
                        >
                            Guest
                        </button>
                        <button 
                            onClick={() => setRole('Host')}
                            className={`flex-1 text-xs py-1.5 rounded-md ${role === 'Host' ? 'bg-white/10 text-white' : 'text-slate-500'}`}
                        >
                            Host
                        </button>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    {sidebarItems
                        .filter(item => item.roles.includes(role))
                        .map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                                    isActive 
                                        ? 'bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-white border border-white/10' 
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-pink-400' : ''}`} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button 
                        onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/register';
                        }}
                        className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors mt-auto"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Background glow effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-slate-900/30 backdrop-blur-md z-10">
                    <h1 className="text-xl font-semibold text-white">
                        {sidebarItems.find(item => item.href === pathname)?.name || 'Dashboard'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 p-[2px]">
                            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-white">{userInitials}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8 z-10" data-lenis-prevent="true">
                    {children}
                </div>
            </main>
        </div>
    );
}
