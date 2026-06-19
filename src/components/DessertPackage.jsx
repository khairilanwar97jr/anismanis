import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import wedding from '../assets/wedding.png';
import genderreveal from '../assets/genderreveal.png';
import sweetbasics from '../assets/sweetbasics.png';
import exquisitedessert from '../assets/exquisitedessert.png';

const DessertPackages = () => {
    const packages = [
        { name: 'Sweet Basic', price: 'RM 399 - RM 500', desc: 'Perfect for intimate celebrations.', image: sweetbasics },
        { name: 'Wedding & Canapés', price: 'RM 400 - RM 700', desc: 'Elegant displays for your special day.', image: wedding },
        { name: 'Gender Reveal', price: 'RM 350 - RM 500', desc: 'Magic for your big reveal.', image: genderreveal },
        { name: 'Exquisite Dessert Table', price: 'RM 700 - RM 1000', desc: 'Premium sweets and savouries.', image: exquisitedessert },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    // Animation: Slides in from the Right (x: 100) to the original position (x: 0)
    const cardVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-white text-[#4a3728] px-2 py-8">
            <div className="container mx-auto max-w-5xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-16"
                >
        <h2 className="text-4xl md:text-7xl font-black text-[#d87a7a] text-center mb-16 tracking-tighter">
          DESSERT TABLES & <br className="md:hidden" />
          <span className="bg-[#d87a7a] text-white px-4 py-1 inline-block -rotate-2">PACKAGES</span>
        </h2>
                    <div className="space-y-6 font-medium opacity-80 text-sm md:text-base leading-relaxed">
                        <p>Welcome to the premier destination for exquisite dessert tables and bespoke catering across KL and PJ.</p>
                        <p>We believe that every milestone deserves to be celebrated with elegance and heart. Whether it’s the timeless romance of a wedding, the joy of a baby’s full-moon celebration, a milestone birthday, or the professional flair of a corporate grand opening, we turn your vision into a sweet reality.</p>
                        <p>Our team specializes in full-service delivery and professional styling. We don’t just bring the treats; we arrive to meticulously set up your dessert table, ensuring every detail—from the placement of our artisan cookies to the styling of our signature cakes—is perfect. We create a breathtaking centerpiece that lets you step back, relax, and savor the company of your guests.</p>
                        <p className="pt-2 font-bold opacity-100 text-[#4a3728]">
                            Have a specific theme or a special request in mind? We love collaborating to bring new ideas to life. Send us a Email above to discuss your event flow and setup needs before you finalize your order.
                        </p>
                    </div>
                </motion.div>

                {/* Packages Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 gap-3 md:gap-10"
                >
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="border border-[#4a3728]/10 p-3 md:p-8 rounded-2xl flex flex-col items-center text-center hover:border-[#d87a7a]/50"
                        >
                            <div className="w-full h-32 md:h-64 mb-3 overflow-hidden rounded-xl bg-[#f9f5f2]">
                                <img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-black uppercase tracking-widest text-[10px] md:text-2xl mb-1 md:mb-3 leading-tight">{pkg.name}</h3>
                            <p className="text-[9px] md:text-sm font-bold opacity-60 mb-2 md:mb-6 flex-grow hidden md:block">{pkg.desc}</p>
                            <div className="text-[#d87a7a] font-black text-xs md:text-2xl mb-2 md:mb-8">{pkg.price}</div>
                            <Link
                                to={`/package/${encodeURIComponent(pkg.name)}`}
                                className="w-full inline-block py-2 md:py-4 border-2 border-[#4a3728] font-black uppercase tracking-widest text-[10px] md:text-sm hover:bg-[#4a3728] hover:text-white transition-all"
                            >
                                Select
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default DessertPackages;