import { motion } from 'framer-motion';
import chocchip1 from '../assets/chocchip1.png';
import chocchip2 from '../assets/chocchip2.png';
import browniesRight from '../assets/qwe.png';
import { Link } from 'react-router-dom';


const cookieVariants = {
  // Mobile: -90px
  mobile: { x: -90, rotate: -15 },
  // Desktop: -180px (wider pull)
  desktop: { x: -180, rotate: -15 }
};


function Hero() {
  return (
    <section className="relative bg-white min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-16 pb-16">


      {/* FLOATING BROWNIE ASSET - RESPONSIVE POSITIONING */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-10 pointer-events-none opacity-90
          /* MOBILE VERSION: Top right, smaller */
          top-30 -right-15 w-[290px] 
          /* DESKTOP VERSION: Larger, shifted down and left */
          md:top-80 md:-right-20 md:w-[300px]"
      >
        <img src={browniesRight} alt="Brownies" className="w-full h-auto" />
      </motion.div>

      {/* Fixed Background Wave */}
      <div className="absolute -top-1 left-0 w-full z-0 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto min-h-[300px] block"
          preserveAspectRatio="none"
        >
          <path
            fill="#e5a9a9"
            d="M0,192L80,208C160,224,320,256,480,256C640,256,800,224,960,197.3C1120,171,1280,149,1360,138.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      {/* NEW: Bottom Left Blob */}
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] z-0 pointer-events-none opacity-70">
        <svg viewBox="-100 200 800 800" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(-4.146224496175023 613.179807930771)">
            <path
              d="M291.4 -162.8C334 -94.5 294.7 26.5 232.5 106.9C170.3 187.3 85.2 227.2 10.1 221.3C-65 215.5 -129.9 164 -194.9 82C-259.8 0 -324.8 -112.5 -292.3 -174.9C-259.8 -237.3 -129.9 -249.7 -2.7 -248.1C124.4 -246.5 248.8 -231 291.4 -162.8"
              fill="#d87a7a"
            />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between relative z-10 gap-10">

        {/* Parent container controls the spin, images control the pull-apart */}
        <motion.div
          className="relative w-full h-[300px] md:h-[400px] flex justify-center items-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <motion.img
            src={chocchip1}
            alt="Cookie Left"
            className="absolute z-10 w-48 md:w-64 object-contain cursor-grab active:cursor-grabbing"
            // Add drag capabilities
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileTap={{ scale: 0.9, cursor: "grabbing" }}

            initial={{ x: 0 }}
            whileInView={{ x: typeof window !== 'undefined' && window.innerWidth >= 768 ? -180 : -90 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.img
            src={chocchip2}
            alt="Cookie Right"
            className="absolute z-10 w-48 md:w-64 object-contain cursor-grab active:cursor-grabbing"
            // Add drag capabilities
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileTap={{ scale: 0.9, cursor: "grabbing" }}

            initial={{ x: 0 }}
            whileInView={{ x: typeof window !== 'undefined' && window.innerWidth >= 768 ? 180 : 90 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </motion.div>
        {/* Content - Slide In Animation */}
        <motion.div
          className="w-full text-center md:text-right px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
<motion.h1 
  variants={{
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  }}
  className="text-6xl md:text-8xl font-bold text-[#4a3728] leading-[1] mb-6 tracking-tighter"
>
  Baked Daily, <br />
  <span className="text-[#d87a7a]">With Absolute Care.</span>
</motion.h1>

<motion.p 
  variants={{
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  }}
  className="text-[#4a3728]/80 font-normal text-xl md:text-2xl max-w-lg mx-auto md:mr-0 mb-8 leading-relaxed"
>
  Artisanal cookies, crafted with patience and premium ingredients. 
  Experience the perfect balance of texture and taste.
</motion.p>
 
<motion.div
  variants={{
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  }}
>
  <Link to="/provisions">
    <button className="border-2 border-[#4a3728] text-[#4a3728] px-12 py-4 font-bold uppercase tracking-widest hover:bg-[#d87a7a] hover:border-[#d87a7a] hover:text-white transition-all duration-300">
      Explore Menu
    </button>
  </Link>
</motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero;