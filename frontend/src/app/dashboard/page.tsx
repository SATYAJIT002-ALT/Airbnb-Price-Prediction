'use client';

import { motion } from 'framer-motion';
import { Home, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', revenue: 4000, bookings: 24 },
    { name: 'Feb', revenue: 3000, bookings: 18 },
    { name: 'Mar', revenue: 5000, bookings: 29 },
    { name: 'Apr', revenue: 8780, bookings: 45 },
    { name: 'May', revenue: 5890, bookings: 32 },
    { name: 'Jun', revenue: 6239, bookings: 38 },
];

export default function DashboardOverview() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stat Card 1 */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
                            <ArrowUpRight className="w-4 h-4" />
                            12.5%
                        </div>
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Total Revenue</h3>
                    <p className="text-3xl font-bold text-white">$24,592.00</p>
                </motion.div>

                {/* Stat Card 2 */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                            <Home className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
                            <ArrowUpRight className="w-4 h-4" />
                            2.4%
                        </div>
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Active Properties</h3>
                    <p className="text-3xl font-bold text-white">12</p>
                </motion.div>

                {/* Stat Card 3 */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
                            <ArrowUpRight className="w-4 h-4" />
                            8.1%
                        </div>
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Total Guests</h3>
                    <p className="text-3xl font-bold text-white">1,204</p>
                </motion.div>

                {/* Stat Card 4 */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1 text-red-400 text-sm font-medium bg-red-400/10 px-2 py-1 rounded-full">
                            <ArrowDownRight className="w-4 h-4" />
                            1.2%
                        </div>
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium mb-1">AI Prediction Accuracy</h3>
                    <p className="text-3xl font-bold text-white">94.2%</p>
                </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <h3 className="text-lg font-semibold text-white mb-6">Revenue Overview</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#ec4899' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col"
                >
                    <h3 className="text-lg font-semibold text-white mb-6">Recent Bookings</h3>
                    
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-white truncate">Luxury Villa - Bali</h4>
                                    <p className="text-xs text-slate-400 truncate">Booked by Alex M.</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-emerald-400">+$450</div>
                                    <div className="text-xs text-slate-500">2h ago</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
