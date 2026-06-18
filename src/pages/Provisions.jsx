import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import Navbar from '../components/Navbar';
import { apiFetch } from '../api';

const Provisions = () => {
    const navigate = useNavigate(); // 2. Initialize navigate

    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();

                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-white text-[#4a3728]">
            <Navbar />
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Sidebar: Filters */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <h2 className="font-black text-lg mb-6 uppercase tracking-[0.2em]">Cake Type</h2>
                        <div className="space-y-4 mb-10">
                            {['Cake Bites (1)', 'Cheesecakes (1)', 'Chocolate Cakes (2)', 'Crepe Cakes (2)'].map((item) => (
                                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-[#4a3728]/30 text-[#d87a7a] focus:ring-[#d87a7a] accent-[#d87a7a]" />
                                    <span className="text-sm font-bold uppercase tracking-widest group-hover:text-[#d87a7a] transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>

                        <h2 className="font-black text-lg mb-6 uppercase tracking-[0.2em]">Price (RM)</h2>
                        <div className="flex items-center gap-2 mb-4">
                            <input type="text" className="w-20 border border-[#4a3728]/20 p-2 text-sm text-center font-medium" placeholder="95.00" />
                            <span className="opacity-50">—</span>
                            <input type="text" className="w-20 border border-[#4a3728]/20 p-2 text-sm text-center font-medium" placeholder="150.00" />
                        </div>
                        <input type="range" className="w-full h-1 bg-[#4a3728]/20 accent-[#d87a7a] appearance-none" />
                    </aside>

                    {/* Main Grid: Products */}
                    <main className="flex-1">
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    whileHover={{ y: -5 }}
                                    onClick={() => navigate(`/provisions/${product.id}`)}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[3/4] bg-[#f9f5f2] mb-4 overflow-hidden border border-[#4a3728]/5">
                                        <img
                                            src={product.image_url || "https://via.placeholder.com/300x400"}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-2 left-2 bg-[#d87a7a] px-2 py-0.5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] text-white">
                                            KL/Selangor
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-sm md:text-lg mb-0.5 uppercase tracking-tight leading-tight">
                                        {product.name}
                                    </h3>
                                    <p className="font-black text-md md:text-xl mb-2">RM {product.price.toFixed(2)}</p>

                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-2">
                                        <span className="text-[#d87a7a] text-[10px] md:text-sm tracking-widest">★★★★★</span>
                                        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-60">10 reviews</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Provisions;