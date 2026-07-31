'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const DUMMY_PROPERTIES = [
    {
        id: 1,
        title: 'Taj Mahal Palace',
        image: '/images/taj_mahal_palace_1785496479618.png',
        location: 'Mumbai, India',
        price: 350,
        rating: 4.9
    },
    {
        id: 2,
        title: 'The Oberoi Amarvilas',
        image: '/images/oberoi_amarvilas_1785496490067.png',
        location: 'Agra, India',
        price: 500,
        rating: 5.0
    },
    {
        id: 3,
        title: 'ITC Grand Chola',
        image: '/images/itc_grand_chola_1785496500399.png',
        location: 'Chennai, India',
        price: 200,
        rating: 4.8
    },
    {
        id: 4,
        title: 'Marina Bay Sands',
        image: '/images/marina_bay_sands_1785496513965.png',
        location: 'Singapore',
        price: 850,
        rating: 4.7
    },
    {
        id: 5,
        title: 'Ritz-Carlton Paris',
        image: '/images/ritz_carlton_paris_1785496523472.png',
        location: 'Paris, France',
        price: 1200,
        rating: 4.9
    },
    {
        id: 6,
        title: 'Burj Al Arab',
        image: '/images/penthouse_dubai_1785494083390.png',
        location: 'Dubai, UAE',
        price: 2500,
        rating: 5.0
    },
    {
        id: 7,
        title: 'The Plaza Hotel',
        image: '/images/modern_loft_nyc_1785494063540.png',
        location: 'New York, USA',
        price: 900,
        rating: 4.8
    },
    {
        id: 8,
        title: 'Aman Tokyo',
        image: '/images/luxury_villa_bali_1785494052602.png',
        location: 'Tokyo, Japan',
        price: 1100,
        rating: 4.9
    }
];

export default function ExplorePage() {
    const [properties, setProperties] = useState<any[]>(DUMMY_PROPERTIES);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/properties`);
                if (response.ok) {
                    const data = await response.json();
                    setProperties([...data, ...DUMMY_PROPERTIES]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProperties();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">Explore Homes</h2>
                    <p className="text-slate-400">Find the perfect AI-priced stay for your next trip.</p>
                </div>
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                        type="text" 
                        className="w-full bg-black/20 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 transition-colors"
                        placeholder="Search destinations..."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {properties.map((property, index) => (
                    <motion.div 
                        key={property._id || property.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group cursor-pointer"
                    >
                        <div className="h-64 bg-slate-800 rounded-3xl mb-4 overflow-hidden relative border border-white/5 group-hover:border-white/20 transition-all">
                            <img src={property.images?.[0] || property.image || '/images/modern_loft_nyc_1785494063540.png'} alt={property.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                            <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:text-pink-500 transition-colors z-10">
                                <Star className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="px-2">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-white truncate">{property.title}</h3>
                                <div className="flex items-center gap-1 text-sm text-slate-300">
                                    <Star className="w-3 h-3 fill-pink-500 text-pink-500" /> {property.ratings?.average || property.rating || 4.9}
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mb-2 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {property.location?.city || property.location || 'Unknown'}
                            </p>
                            <div className="text-white font-medium">
                                ${property.predictedPrice || property.pricePerNight || property.price} <span className="text-slate-500 font-normal">night</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
