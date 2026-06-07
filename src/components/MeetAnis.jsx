import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

function MeetAnis() {
  const cafeGallery = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === cafeGallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6 relative w-full pt-32 pb-24">
        {/* Anis Profile Box */}
        <div className="w-full md:w-5/12 flex justify-center">
          <div className="w-full max-w-[350px] aspect-square bg-[#f5e6e0] rounded-[40px] border-4 border-[#4a3728] shadow-[8px_8px_0px_0px_rgba(74,55,40,1)] flex items-center justify-center">
            <span className="text-[#4a3728] font-black tracking-widest uppercase">Photo of Anis</span>
          </div>
        </div>

        <div className="w-full md:w-7/12">
          <h2 className="text-4xl md:text-7xl font-black text-[#4a3728] mb-8">
            Meet <span className="text-[#d87a7a]">Anis!</span>
          </h2>
          <div className="space-y-6 text-[#4a3728] font-medium leading-relaxed">
            <p className="text-lg">
              Hi! I am Anis, the founder and pastry architect behind AnisManis Pâtisserie. My journey began in 2022, born from a simple goal: to supply fresh, artisanal bread to my hometown. Seeing neighbors enjoy my bakes was the spark that fueled my passion to refine my skills, moving from rustic loaves to the delicate art of custom cakes.
            </p>
            <p className="text-lg opacity-90">
              The true test of my craft comes during the festive tides. Hari Raya is my favorite time—a whirlwind of tradition where I’ve proudly fulfilled high demand, often crossing over 60 jars of signature biscuits in a single season. Every jar is a testament to the trust my community places in my hands.
            </p>
            <p className="text-lg opacity-90">
              Today, I am evolving. I’m channeling my passion into crafting bespoke dessert tables for weddings, turning grand celebrations into sweet memories. But I am not stopping there. My ultimate vision is to bring the AnisManis experience to the streets of Kuala Lumpur. I am working tirelessly toward the day we open the doors to our very own café—a space where the aroma of fresh bakes and the spirit of community will finally have a permanent home.
            </p>
          </div>
        </div>
      </div>

      {/* SMOOTH SLIDER SECTION */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="border-t-4 border-[#4a3728] pt-16">
          <h3 className="text-3xl md:text-5xl font-black text-[#4a3728] mb-12 text-center tracking-tighter">Our Vision: The AnisManis Café</h3>
          
          <div className="relative w-full aspect-video rounded-[30px] border-4 border-[#4a3728] shadow-[8px_8px_0px_0px_rgba(74,55,40,1)] bg-[#f5e6e0] overflow-hidden group">
            
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={cafeGallery[currentIndex]}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="absolute w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <button 
              onClick={nextSlide}
              className="absolute bottom-6 right-6 bg-[#4a3728] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#d87a7a] transition-all z-10"
            >
              Next View →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MeetAnis;