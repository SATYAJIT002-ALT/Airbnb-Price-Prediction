'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

const DUMMY_BOOKINGS = [
    {
        id: 1,
        title: 'Marina Bay Sands',
        image: '/images/marina_bay_sands_1785496513965.png',
        dates: 'Oct 12 - Oct 15, 2026',
        total: 2550,
        status: 'Confirmed',
        type: 'Upcoming'
    },
    {
        id: 2,
        title: 'Taj Mahal Palace',
        image: '/images/taj_mahal_palace_1785496479618.png',
        dates: 'Nov 01 - Nov 05, 2026',
        total: 1400,
        status: 'Confirmed',
        type: 'Upcoming'
    },
    {
        id: 3,
        title: 'The Oberoi Amarvilas',
        image: '/images/oberoi_amarvilas_1785496490067.png',
        dates: 'Dec 20 - Dec 27, 2026',
        total: 3500,
        status: 'Cancelled',
        type: 'Cancelled'
    },
    {
        id: 4,
        title: 'Ritz-Carlton Paris',
        image: '/images/ritz_carlton_paris_1785496523472.png',
        dates: 'Jan 10 - Jan 15, 2026',
        total: 4200,
        status: 'Confirmed',
        type: 'Past'
    }
];

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState('Upcoming');

    const filteredBookings = DUMMY_BOOKINGS.filter(b => b.type === activeTab);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-8">My Bookings</h2>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex gap-4">
                    <button 
                        onClick={() => setActiveTab('Upcoming')} 
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'Upcoming' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                    >Upcoming</button>
                    <button 
                        onClick={() => setActiveTab('Past')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'Past' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                    >Past</button>
                    <button 
                        onClick={() => setActiveTab('Cancelled')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'Cancelled' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                    >Cancelled</button>
                </div>
                
                <div className="divide-y divide-white/5">
                    {filteredBookings.length === 0 ? (
                        <div className="p-12 text-center text-slate-400">No {activeTab.toLowerCase()} bookings found.</div>
                    ) : (
                        filteredBookings.map((booking) => (
                        <div key={booking.id} className="p-6 flex flex-col md:flex-row gap-6 items-center hover:bg-white/5 transition-colors">
                            <div className="w-32 h-24 bg-slate-900 rounded-2xl flex-shrink-0 relative overflow-hidden">
                                <img src={booking.image} alt={booking.title} className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 w-full text-left">
                                <div className="flex items-center gap-2 mb-1">
                                    {booking.status === 'Confirmed' ? (
                                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20 flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" /> Confirmed
                                        </span>
                                    ) : (
                                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/20 flex items-center gap-1">
                                            <XCircle className="w-3 h-3" /> Cancelled
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-white">{booking.title}</h3>
                                <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                                    <Calendar className="w-3 h-3" /> {booking.dates}
                                </p>
                            </div>
                            <div className="text-right w-full md:w-auto">
                                <div className="text-xl font-bold text-white">${booking.total}</div>
                                <div className="text-sm text-slate-400">Total</div>
                                <button className="mt-3 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">
                                    Manage
                                </button>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        </div>
    );
}
