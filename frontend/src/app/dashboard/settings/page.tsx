'use client';

import { motion } from 'framer-motion';
import { User, Bell, Shield, CreditCard, Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    useEffect(() => {
        // Load initial user data from localStorage if available
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                const nameParts = user.name ? user.name.split(' ') : [];
                setFormData({
                    firstName: nameParts[0] || '',
                    lastName: nameParts.slice(1).join(' ') || '',
                    email: user.email || ''
                });
            }
        } catch (e) {
            console.error('Failed to parse user data');
        }
    }, []);

    const handleSave = async () => {
        setLoading(true);
        setSuccess(false);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                // Update local storage so other parts of the app can use the new name
                localStorage.setItem('user', JSON.stringify({
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role
                }));
                window.dispatchEvent(new Event('user-updated'));
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-white mb-8">Account Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Navigation */}
                <div className="md:col-span-1 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-xl font-medium transition-colors">
                        <User className="w-4 h-4" /> Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
                        <Bell className="w-4 h-4" /> Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
                        <Shield className="w-4 h-4" /> Security
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
                        <CreditCard className="w-4 h-4" /> Payments
                    </button>
                </div>

                {/* Content */}
                <div className="md:col-span-3 space-y-6">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden">
                        
                        {/* Success Notification */}
                        {success && (
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-0 left-0 right-0 bg-emerald-500/20 border-b border-emerald-500/30 text-emerald-400 px-6 py-3 flex items-center justify-center gap-2 font-medium"
                            >
                                <CheckCircle2 className="w-5 h-5" /> Profile updated successfully!
                            </motion.div>
                        )}

                        <h3 className={`text-xl font-bold text-white mb-6 ${success ? 'mt-8' : ''}`}>Personal Information</h3>
                        
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 p-[2px]">
                                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-3xl font-bold text-white uppercase">
                                    {formData.firstName?.[0] || 'J'}{formData.lastName?.[0] || 'D'}
                                </div>
                            </div>
                            <div>
                                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors mb-2">Change Avatar</button>
                                <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                                <input 
                                    value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                                    type="text" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                                <input 
                                    value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                                    type="text" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors" placeholder="Doe" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                <input 
                                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                    type="email" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors" placeholder="john@example.com" />
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                            <button 
                                onClick={handleSave}
                                disabled={loading}
                                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white rounded-xl font-medium shadow-lg transition-all flex items-center gap-2"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
