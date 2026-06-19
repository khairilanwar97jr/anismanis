import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Supply from '../components/Supply'
import Booking from '../components/Booking'
import MeetAnis from '../components/MeetAnis'
import LatestBooking from '../components/LatestBooking'
import DessertPackage from '../components/DessertPackage'
import { motion, useScroll, useTransform } from 'framer-motion';

function HomePage() {
  return (
    <div className="text-center w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      {/* Supply Section with Reveal/Hide on Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }} // Disappear when scrolling away
        viewport={{ amount: 0.3, once: false }} // Triggers every time
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Supply />
      </motion.div>
      <Booking />
      {/* <MeetAnis /> */}
      <DessertPackage />
      <LatestBooking /> 
    


      
      {/* Footer dengan Cookie Texture & Dusty Pink Color */}
      <footer className="relative bg-[#e5a9a9] text-[#4a3728] pt-20 pb-12 px-6 overflow-hidden">
        {/* Cookie Texture Overlay - Tetap nampak biskut atas pink background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#4a3728 2px, transparent 2px)',
            backgroundSize: '30px 30px'
          }}
        />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-6 z-10">
          {/* Branding */}
          <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-5xl font-bold">
            Anismanis Patisserie
          </h2>

          <p className="font-medium italic max-w-[280px] md:max-w-md text-sm md:text-base">
            "Refined pastries, crafted with passion."
          </p>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-xs md:text-sm font-black uppercase tracking-[0.2em]">
            <a href="#" className="hover:underline py-1">Instagram</a>
            <a href="#" className="hover:underline py-1">Menu</a>
            <a href="#" className="hover:underline py-1">Contact</a>
          </div>

          {/* Copyright */}
          <div className="text-[10px] uppercase tracking-widest opacity-60 mt-4 text-center">
            © {new Date().getFullYear()} Anismanis Patisserie.<br />
            All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage