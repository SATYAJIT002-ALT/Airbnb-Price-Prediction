'use client';

import { motion } from 'framer-motion';
import { Sparkles, Save, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPropertyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [priceLoading, setPriceLoading] = useState(false);
    const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        city: '',
        bedrooms: 1,
        bathrooms: 1,
        guests: 2,
        propertyType: 'Apartment',
        description: '',
        customPrice: ''
    });

    const handlePredict = async () => {
        setPriceLoading(true);
        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    latitude: 40.7128,
                    longitude: -74.0060,
                    city: formData.city || 'New York',
                    room_type: 'Entire place',
                    property_type: formData.propertyType,
                    bedrooms: formData.bedrooms,
                    bathrooms: formData.bathrooms,
                    accommodates: formData.guests
                })
            });
            if (response.ok) {
                const data = await response.json();
                if (data.predicted_price) {
                    setPredictedPrice(Math.round(data.predicted_price));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPriceLoading(false);
        }
    };

    const handlePublish = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formData.title || 'Untitled Property',
                    description: formData.description || 'A beautiful property.',
                    pricePerNight: parseFloat(formData.customPrice) || predictedPrice || 150,
                    location: {
                        address: '123 Main St',
                        city: formData.city || 'Miami',
                        state: 'FL',
                        country: 'USA',
                        latitude: 40.7128,
                        longitude: -74.0060
                    },
                    details: {
                        bedrooms: formData.bedrooms,
                        bathrooms: formData.bathrooms,
                        accommodates: formData.guests,
                        propertyType: formData.propertyType,
                        roomType: 'Entire place'
                    },
                    amenities: ['WiFi', 'Pool'],
                    images: ['/images/modern_loft_nyc_1785494063540.png']
                })
            });

            if (response.ok) {
                router.push('/dashboard/properties');
            } else {
                const errData = await response.text();
                console.error('Failed to publish:', errData);
                alert(`Failed to publish: ${errData}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">Add New Property</h2>
                <p className="text-slate-400">List your property and let AI predict the best price.</p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Property Title</label>
                        <input 
                            value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                            type="text" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-pink-500 focus:outline-none" placeholder="e.g. Sunny Beachfront Villa" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Location (City)</label>
                        <input 
                            value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
                            type="text" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-pink-500 focus:outline-none" placeholder="e.g. Miami, FL" />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Bedrooms</label>
                        <input 
                            value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: parseInt(e.target.value) || 0})}
                            type="number" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Bathrooms</label>
                        <input 
                            value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: parseInt(e.target.value) || 0})}
                            type="number" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Guests</label>
                        <input 
                            value={formData.guests} onChange={e => setFormData({...formData, guests: parseInt(e.target.value) || 0})}
                            type="number" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Property Type</label>
                        <select 
                            value={formData.propertyType} onChange={e => setFormData({...formData, propertyType: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none">
                            <option>Apartment</option>
                            <option>House</option>
                            <option>Villa</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea 
                        value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                        rows={4} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-pink-500 focus:outline-none" placeholder="Describe your amazing space..." />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Price per Night ($)</label>
                    <input 
                        value={formData.customPrice} onChange={e => setFormData({...formData, customPrice: e.target.value})}
                        type="number" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-pink-500 focus:outline-none" placeholder="e.g. 150 (Leave blank to use AI Prediction)" />
                </div>

                {predictedPrice !== null && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-medium">
                        ✨ AI Recommended Price: ${predictedPrice} / night
                    </div>
                )}

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <button 
                        onClick={handlePredict}
                        disabled={priceLoading}
                        className="px-4 py-2 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 rounded-xl font-medium transition-colors flex items-center gap-2">
                        {priceLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} AI Predict Price
                    </button>
                    <button 
                        onClick={handlePublish}
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white rounded-xl font-medium shadow-lg flex items-center justify-center gap-2 transition-all">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Publish Listing
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
