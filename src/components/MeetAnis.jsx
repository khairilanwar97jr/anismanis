import React from 'react';
import { motion } from 'framer-motion';

function MeetAnis() {

// Ekor kanan dipanjangkan ke 5000px
// Ekor kanan dipanjangkan ke 10,000px
const cookiePathRight = "M442,0 L10000,0 L10000,600 L322,600 L339,588 C357,577 392,555 421,533 C451,511 475,489 486,466 C498,444 498,422 476,400 C454,377 410,355 382,333 C354,311 342,289 349,266 C356,244 383,222 425,200 C467,177 524,155 537,133 C550,111 518,89 495,66 C472,44 457,22 449,11 Z";

// Ekor kiri dipanjangkan ke -10,000px
const cookiePathLeft = "M-10000,0 L442,0 C457,22 472,44 495,66 C518,89 550,111 537,133 C524,155 467,177 425,200 C383,222 356,244 349,266 C342,289 354,311 382,333 C410,355 454,377 476,400 C498,422 498,444 486,466 C475,489 451,511 421,533 C392,555 357,577 339,588 L322,600 L-10000,600 L-10000,0 Z";
    const mobileRight = "M150,0 L400,0 L400,600 L120,600 C140,550 160,500 140,450 C160,400 140,350 160,300 C140,250 160,200 140,150 C160,100 140,50 150,20 Z";
    const mobileLeft = "M0,0 L150,0 C170,30 150,80 170,120 C150,160 170,200 150,240 C170,280 150,320 170,360 C150,400 170,440 150,480 C170,520 150,560 140,600 L0,600 Z";

    return (
        <section className="relative w-full min-h-screen bg-white overflow-hidden py-24">

            {/* 1. LAYER BAWAH: Background Biskut */}
            {/* Buang opacity-15, tukar kepada opacity-100 (atau buang terus) */}
            <div className="absolute top-0 right-0 w-[50%] h-full z-0 opacity-100 pointer-events-none">
                {/* Desktop */}
                <div
                    className="hidden lg:block w-full h-full bg-[#d9a066]"
                    style={{ clipPath: `path("${cookiePathRight}")` }}
                />
                {/* Mobile */}
                <div
                    className="lg:hidden w-full h-full bg-[#d9a066]"
                    style={{ clipPath: `path("${mobileRight}")` }}
                />
            </div>

            {/* 2. CONTENT */}
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6 z-10 relative w-full">
                <div className="w-full md:w-5/12 flex justify-center">
                    <div className="w-full max-w-[350px] aspect-square bg-[#fde047] rounded-[40px] border-4 border-[#4a3728] shadow-[8px_8px_0px_0px_rgba(74,55,40,1)] flex items-center justify-center">
                        <span className="text-[#4a3728] font-black tracking-widest uppercase">Photo of Anis</span>
                    </div>
                </div>
                <div className="w-full md:w-7/12">
                    <h2 className="text-4xl md:text-7xl font-black text-[#4a3728] mb-8">
                        Meet <span className="text-[#d87a7a]">Anis!</span>
                    </h2>
                    <div className="space-y-6 text-[#4a3728] font-medium leading-relaxed">
                        <p className="text-lg">Hi! I am Anis, the Owner and Pastry Chef behind Honeybear Bake Shop!</p>
                        <p className="text-lg opacity-90">My journey began with a childhood dream.</p>
                    </div>
                </div>
            </div>

{/* 3. LAYER ATAS: Cookie Overlay */}
{/* 3. LAYER ATAS: Cookie Overlay */}
{/* Tambah overflow-hidden kat parent supaya biskut tak nampak melimpah kat luar skrin masa animasi */}
<div className="absolute inset-0 z-20 pointer-events-none flex overflow-hidden">
  
  {/* Desktop Version */}
  <div className="hidden lg:flex w-[120%] -ml-[10%] h-full"> 
    <motion.div 
      initial={{ x: '30%' }} // Mula dari sikit je ke tengah
      whileInView={{ x: '-100%' }} 
      transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }} 
      className="w-1/2 h-full bg-[#d9a066]" 
      style={{ clipPath: `path("${cookiePathLeft}")` }} 
    />
    <motion.div 
      initial={{ x: '-30%' }} 
      whileInView={{ x: '100%' }} 
      transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }} 
      className="w-1/2 h-full bg-[#d9a066]" 
      style={{ clipPath: `path("${cookiePathRight}")` }} 
    />
  </div>
  
  {/* Mobile Version */}
  <div className="lg:hidden flex w-[140%] -ml-[20%] h-full">
    <motion.div 
      initial={{ x: '15%' }} 
      whileInView={{ x: '-100%' }} 
      transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }} 
      className="w-1/2 h-full bg-[#d9a066]" 
      style={{ clipPath: `path("${mobileLeft}")` }} 
    />
    <motion.div 
      initial={{ x: '-15%' }} 
      whileInView={{ x: '100%' }} 
      transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }} 
      className="w-1/2 h-full bg-[#d9a066]" 
      style={{ clipPath: `path("${mobileRight}")` }} 
    />
  </div>
</div>

        </section>
    );
}

export default MeetAnis;