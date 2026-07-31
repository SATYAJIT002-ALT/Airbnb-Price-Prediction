'use client';

import { motion } from 'framer-motion';
import { Sparkles, Download, CheckCircle, ChevronDown } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function PredictPage() {
    const [formData, setFormData] = useState({
        city: 'New York, US',
        room_type: 'Entire place',
        property_type: 'Apartment',
        cancellation_policy: 'Moderate',
        latitude: 40.73,
        longitude: -73.99,
        bedrooms: 2,
        bathrooms: 1,
        beds: 2,
        guests: 4,
        min_nights: 2,
        max_nights: 30,
        availability: 365,
        cleaning_fee: 50
    });

    const [prediction, setPrediction] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const debouncedFormData = useDebounce(formData, 500); // Wait 500ms after last typing

    // Simulate API call when form changes
    useEffect(() => {
        const fetchPrediction = async () => {
            setLoading(true);
            try {
                // Call the real ML FastAPI service running on port 8000
                const response = await fetch('http://localhost:8000/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        latitude: debouncedFormData.latitude,
                        longitude: debouncedFormData.longitude,
                        city: debouncedFormData.city,
                        room_type: debouncedFormData.room_type,
                        property_type: debouncedFormData.property_type,
                        bedrooms: debouncedFormData.bedrooms,
                        bathrooms: debouncedFormData.bathrooms,
                        accommodates: debouncedFormData.guests
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.predicted_price) {
                        setPrediction(Math.round(data.predicted_price));
                    } else if (data.error) {
                        console.error('ML API Error:', data.error);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch prediction', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrediction();
    }, [debouncedFormData]);

    const handleInput = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'city' || name.includes('type') || name.includes('policy') ? value : Number(value)
        }));
    };

    const priceRangeMin = prediction ? Math.round(prediction * 0.75) : 0;
    const priceRangeMax = prediction ? Math.round(prediction * 1.25) : 0;
    const recommendedAsk = prediction ? Math.round(prediction * 1.1) : 0;

    return (
        <div className="min-h-[85vh] text-slate-200 font-sans relative">
            {/* Background constellation effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_15px_3px_#34d399]" />
                <div className="absolute top-[40%] left-[30%] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_15px_3px_#22d3ee]" />
                <div className="absolute top-[10%] right-[20%] w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_20px_4px_#10b981]" />
                <div className="absolute bottom-[30%] right-[30%] w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_15px_3px_#06b6d4]" />
                <svg className="absolute inset-0 w-full h-full stroke-slate-700/50 stroke-[0.5px]" fill="none">
                    <path d="M 10% 20% L 30% 40% L 80% 10% L 70% 70% Z" />
                </svg>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Predict a nightly rate</h1>
                    <p className="text-slate-400 text-lg">The model re-scores live as you edit any attribute.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Form Panel */}
                    <div className="lg:col-span-7 bg-[#0f172a]/80 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Row 1 */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Market</label>
                                <div className="relative">
                                    <select name="city" value={formData.city} onChange={handleInput} className="w-full appearance-none bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                                        <option>New York, US</option>
                                        <option>Los Angeles, US</option>
                                        <option>London, UK</option>
                                        <option>Paris, FR</option>
                                        <option>Mumbai, India</option>
                                        <option>Delhi, India</option>
                                        <option>Bangalore, India</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Room type</label>
                                <div className="relative">
                                    <select name="room_type" value={formData.room_type} onChange={handleInput} className="w-full appearance-none bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                                        <option>Entire place</option>
                                        <option>Private room</option>
                                        <option>Shared room</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Property type</label>
                                <div className="relative">
                                    <select name="property_type" value={formData.property_type} onChange={handleInput} className="w-full appearance-none bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                                        <option>Apartment</option>
                                        <option>House</option>
                                        <option>Condo</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Cancellation policy</label>
                                <div className="relative">
                                    <select name="cancellation_policy" value={formData.cancellation_policy} onChange={handleInput} className="w-full appearance-none bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                                        <option>Moderate</option>
                                        <option>Flexible</option>
                                        <option>Strict</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Row 3 - Coordinates */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Latitude</label>
                                <input type="number" name="latitude" step="0.01" value={formData.latitude} onChange={handleInput} className="w-full bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Longitude</label>
                                <input type="number" name="longitude" step="0.01" value={formData.longitude} onChange={handleInput} className="w-full bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                            </div>

                            {/* Row 4 - Bed/Bath */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Bedrooms</label>
                                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleInput} className="w-full bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Bathrooms</label>
                                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleInput} className="w-full bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                            </div>

                            {/* Row 5 - Guests */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Beds</label>
                                <input type="number" name="beds" value={formData.beds} onChange={handleInput} className="w-full bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Guests</label>
                                <input type="number" name="guests" value={formData.guests} onChange={handleInput} className="w-full bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                            </div>

                            {/* Row 6 - Nights */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Minimum nights</label>
                                <input type="number" name="min_nights" value={formData.min_nights} onChange={handleInput} className="w-full bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Maximum nights</label>
                                <input type="number" name="max_nights" value={formData.max_nights} onChange={handleInput} className="w-full bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                            </div>
                        </form>
                    </div>

                    {/* Right Results Panel */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Live Prediction Card */}
                        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-emerald-500/20 p-8 rounded-3xl shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]">
                            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-6">
                                <Sparkles className="w-4 h-4" /> Live prediction
                                {loading && <span className="ml-2 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />}
                            </div>

                            <div className="mb-8">
                                <motion.div 
                                    key={prediction}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight"
                                >
                                    ${prediction || '...'}
                                </motion.div>
                                <div className="text-slate-400 mt-2 text-lg">expected nightly rate</div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-8 border-b border-slate-700/50 pb-8">
                                <div>
                                    <div className="text-slate-400 text-sm mb-1">Price range</div>
                                    <div className="text-white font-bold text-lg">${priceRangeMin} - ${priceRangeMax}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 text-sm mb-1">Confidence</div>
                                    <div className="text-white font-bold text-lg">94.2%</div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="text-slate-400 text-sm mb-2">Recommended ask</div>
                                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                                    <span className="text-xl inline-block transform -rotate-45">↗</span> ${recommendedAsk} / night
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors">
                                    Save to history
                                </button>
                                <button className="px-6 py-3 border border-slate-600 hover:border-slate-400 text-white rounded-xl transition-colors flex items-center gap-2">
                                    <Download className="w-4 h-4" /> Export CSV
                                </button>
                            </div>
                        </div>

                        {/* Why this price Card */}
                        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6">Why this price</h3>
                            
                            <div className="space-y-5">
                                {/* Feature 1 */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-300">Room type</span>
                                        <span className="text-emerald-400 font-bold">+31.0%</span>
                                    </div>
                                    <div className="w-full bg-[#1e293b] rounded-full h-2">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: '85%' }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="bg-emerald-400 h-2 rounded-full" 
                                        />
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-300">Guest capacity</span>
                                        <span className="text-emerald-400 font-bold">+27.5%</span>
                                    </div>
                                    <div className="w-full bg-[#1e293b] rounded-full h-2">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: '75%' }}
                                            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                                            className="bg-emerald-400 h-2 rounded-full" 
                                        />
                                    </div>
                                </div>

                                {/* Feature 3 */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-300">Bedrooms</span>
                                        <span className="text-emerald-400 font-bold">+17.0%</span>
                                    </div>
                                    <div className="w-full bg-[#1e293b] rounded-full h-2">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: '50%' }}
                                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                            className="bg-emerald-400 h-2 rounded-full" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
