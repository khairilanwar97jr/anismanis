import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import petronImg from "../assets/petron.jpg";
import hariRayaImg from "../assets/hariraya.jpg";
import weddingImg from "../assets/kekwedding.jpg";
import rightCookiesImg from "../assets/rightcookies.png";
import signboard from "../assets/signboard.png";


function Supply() {

const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
// Parallax effect: moves the background image slowly as you scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [index, setIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: "01", title: "Petron Supply", desc: "Serving premium cookies at select Petron stations.", details: "Our cookies are delivered daily to select Petron locations, ensuring freshness and premium quality for travelers on the go.", img: petronImg },
    { id: "02", title: "Hari Raya", desc: "Traditional recipes with a modern flair.", details: "We specialize in authentic recipes passed down through generations, elevated with premium ingredients for the festive season.", img: hariRayaImg },
    { id: "03", title: "Custom Events", desc: "Bespoke cakes and dessert tables.", details: "From weddings to corporate launches, we create custom dessert tables designed specifically to match your event theme.", img: weddingImg },
  ];

  const nextCard = () => setIndex((prev) => (prev + 1) % services.length);
  const prevCard = () => setIndex((prev) => (prev - 1 + services.length) % services.length);

  useEffect(() => {
    const timer = setInterval(nextCard, 4000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section ref={containerRef} className="py-20 px-6 overflow-hidden relative min-h-[800px] flex items-center justify-center">
      
      {/* PARALLAX BACKGROUND LAYER */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 z-0 opacity-90"   >
{/* FIXED BACKGROUND LAYER - Shifted Down */}
<div className="absolute inset-0 z-0">
  <img 
    src={signboard} 
    alt="background" 
    loading="lazy"
    className="w-full h-full object-cover fixed top-35  left-0 right-90" // Changed top-0 to top-20
  />
</div>
      </motion.div>

      {/* Floating Cookie (Moved inside relative div) */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 top-40 w-[300px] md:w-[400px] pointer-events-none z-10"
      >
        <img src={rightCookiesImg} alt="" className="w-full h-auto" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-20">
        <h2 className="text-4xl md:text-7xl font-black text-[#d87a7a] text-center mb-16 tracking-tighter">
          OUR SUPPLY & <br className="md:hidden" />
          <span className="bg-[#d87a7a] text-white px-4 py-1 inline-block -rotate-2">SERVICES</span>
        </h2>

        {/* MOBILE: Swipeable */}
        <div className="md:hidden relative h-[400px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={services[index].id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset }) => {
                if (offset.x > 50) prevCard();
                if (offset.x < -50) nextCard();
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              onClick={() => setSelectedService(services[index])}
              className="absolute w-full p-6 border-4 border-[#d87a7a] bg-white rounded-[20px] cursor-pointer"
            >
              <img src={services[index].img} alt={services[index].title} className="w-full h-32 object-cover rounded-[10px] mb-4" />
              <div className="text-3xl font-black text-[#d87a7a] mb-2">{services[index].id}</div>
              <h3 className="text-xl font-black text-[#4a3728] uppercase mb-2">{services[index].title}</h3>
              <p className="text-[#4a3728] font-medium text-sm">{services[index].desc}</p>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-4 flex gap-2">
            {services.map((_, i) => (
              <div key={i} className={`h-3 w-3 rounded-full transition-all ${i === index ? "bg-[#d87a7a] scale-110" : "bg-[#d87a7a]/30"}`} />
            ))}
          </div>
        </div>

        {/* DESKTOP: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.id} onClick={() => setSelectedService(s)} className="cursor-pointer group relative p-6 border-4 border-[#d87a7a] bg-white hover:bg-[#d87a7a] transition-colors duration-300 rounded-[20px]">
              <img src={s.img} alt={s.title} className="w-full h-40 object-cover rounded-[10px] mb-6" />
              <div className="text-3xl font-black text-[#d87a7a] mb-4 group-hover:text-white">{s.id}</div>
              <h3 className="text-xl font-black text-[#4a3728] uppercase mb-2 group-hover:text-white">{s.title}</h3>
              <p className="text-[#4a3728] font-medium group-hover:text-white/90">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-[30px] border-4 border-[#d87a7a] max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedService.img} alt={selectedService.title} className="w-full h-48 object-cover rounded-[20px] mb-6" />
              <h3 className="text-2xl font-black text-[#d87a7a] mb-2">{selectedService.title}</h3>
              <p className="text-[#4a3728] font-medium leading-relaxed mb-6">{selectedService.details}</p>
              <button onClick={() => setSelectedService(null)} className="w-full py-3 bg-[#d87a7a] text-white font-black uppercase rounded-full">Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Supply;