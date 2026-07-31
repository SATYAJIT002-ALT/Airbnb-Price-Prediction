'use client';

import { motion } from 'framer-motion';
import { Home, Plus, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DUMMY_PROPERTIES = [
    {
        _id: 'd1',
        title: 'Taj Mahal Palace',
        images: ['/images/taj_mahal_palace_1785496479618.png'],
        details: { bedrooms: 1, bathrooms: 1, accommodates: 2 },
        predictedPrice: 350,
        status: 'Active'
    },
    {
        _id: 'd2',
        title: 'The Oberoi Amarvilas',
        images: ['/images/oberoi_amarvilas_1785496490067.png'],
        details: { bedrooms: 2, bathrooms: 2, accommodates: 4 },
        predictedPrice: 500,
        status: 'Active'
    },
    {
        _id: 'd3',
        title: 'ITC Grand Chola',
        images: ['/images/itc_grand_chola_1785496500399.png'],
        details: { bedrooms: 1, bathrooms: 1, accommodates: 2 },
        predictedPrice: 200,
        status: 'Booked'
    },
    {
        _id: 'd4',
        title: 'Marina Bay Sands',
        images: ['/images/marina_bay_sands_1785496513965.png'],
        details: { bedrooms: 3, bathrooms: 3, accommodates: 6 },
        predictedPrice: 850,
        status: 'Active'
    },
    {
        _id: 'd5',
        title: 'Ritz-Carlton Paris',
        images: ['/images/ritz_carlton_paris_1785496523472.png'],
        details: { bedrooms: 2, bathrooms: 2, accommodates: 4 },
        predictedPrice: 1200,
        status: 'Active'
    }
];

export default function PropertiesPage() {
    const [properties, setProperties] = useState<any[]>(DUMMY_PROPERTIES);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/properties');
                if (response.ok) {
                    const data = await response.json();
                    // Only show real properties from DB
                    setProperties(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProperties();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">My Properties</h2>
                <Link href="/dashboard/properties/new">
                    <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white rounded-xl font-medium shadow-lg flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Property
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                    <motion.div 
                        key={property._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden group"
                    >
                        <div className="h-48 bg-slate-900 relative overflow-hidden">
                            <img src={property.images?.[0] || '/images/modern_loft_nyc_1785494063540.png'} alt={property.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" />
                            <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-emerald-400 border border-white/10 z-10">
                                {property.status || 'Active'}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                {property.details.bedrooms} Beds • {property.details.bathrooms} Baths • {property.details.accommodates} Guests
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="text-pink-400 font-bold">${property.predictedPrice || property.pricePerNight} <span className="text-slate-500 text-sm font-normal">/night</span></div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={async () => {
                                            if (property._id.startsWith('d')) {
                                                setProperties(properties.filter(p => p._id !== property._id));
                                                return;
                                            }
                                            try {
                                                const token = localStorage.getItem('token');
                                                const res = await fetch(`http://localhost:5000/api/properties/${property._id}`, {
                                                    method: 'DELETE',
                                                    headers: { 'Authorization': `Bearer ${token}` }
                                                });
                                                if (res.ok) {
                                                    setProperties(properties.filter(p => p._id !== property._id));
                                                } else {
                                                    alert('Failed to delete: ' + await res.text());
                                                }
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        }}
                                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
