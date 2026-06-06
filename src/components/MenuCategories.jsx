import browniesImg from '../assets/brownies.png';
import cookiesImg from '../assets/cookies.png';
import customCakeImg from '../assets/customcake.png';
import marbleImg from '../assets/marble.png';
import { motion } from 'framer-motion';

const menuData = [
  {
    title: "Cakes",
    image: marbleImg,
    items: ["Marble Cake", "Chocolate Cake", "Pandan Cake", "Custom Cakes"],
  },
  {
    title: "Cookies",
    image: cookiesImg,
    items: ["Classic Choco Chip", "Almond Crunch", "Oatmeal Raisin"],
  },
  {
    title: "Brownies",
    image: browniesImg,
    items: ["Fudgy Classic", "Walnut Bliss", "Salted Caramel"],
  },
  {
    title: "Specialty",
    image: customCakeImg,
    items: ["Signature Tarts", "Seasonal Pastries"],
  }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

function MenuCategories() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
{/* Decorative Blob Background - Added subtle rotation for dynamic feel */}
      <div className="absolute -bottom-20 left-0 w-full z-0 pointer-events-none opacity-60">
        <svg 
          viewBox="0 0 800 600" 
          width="100%" 
          height="auto" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 413L10.7 388.3C21.3 363.7 42.7 314.3 64.2 317.7C85.7 321 107.3 377 128.8 373.7C150.3 370.3 171.7 307.7 193 297.3C214.3 287 235.7 329 257 351.7C278.3 374.3 299.7 377.7 321.2 382.5C342.7 387.3 364.3 393.7 385.8 388.3C407.3 383 428.7 366 450 346.8C471.3 327.7 492.7 306.3 514.2 299.8C535.7 293.3 557.3 301.7 578.8 327.2C600.3 352.7 621.7 395.3 643 403.2C664.3 411 685.7 384 707 388.3C728.3 392.7 749.7 428.3 771.2 412.7C792.7 397 814.3 330 835.8 299C857.3 268 878.7 273 889.3 275.5L900 278L900 601L889.3 601C878.7 601 857.3 601 835.8 601C814.3 601 792.7 601 771.2 601C749.7 601 728.3 601 707 601C685.7 601 664.3 601 643 601C621.7 601 600.3 601 578.8 601C557.3 601 535.7 601 514.2 601C492.7 601 471.3 601 450 601C428.7 601 407.3 601 385.8 601C364.3 601 342.7 601 321.2 601C299.7 601 278.3 601 257 601C235.7 601 214.3 601 193 601C171.7 601 150.3 601 128.8 601C107.3 601 85.7 601 64.2 601C42.7 601 21.3 601 10.7 601L0 601Z" fill="#d87a7a" />
        </svg>
      </div>

      {/* Blob positioned on the right side */}
<div className="absolute top-0 right-0 w-[400px] h-[400px] z-0 pointer-events-none opacity-60 translate-x-1/2 -translate-y-1/4">
  <svg 
    viewBox="0 0 900 600" 
    width="100%" 
    height="100%" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(380.1950364902722 297.9962818035942)">
      <path d="M216.7 -234.6C278.2 -206.6 323.8 -135.8 324.4 -66.9C325 2.1 280.7 69.3 224.5 94.8C168.3 120.4 100.2 104.2 40.9 136.1C-18.4 168.1 -68.9 248 -109.5 253.7C-150 259.3 -180.7 190.7 -184.4 131.8C-188.1 73 -165 24 -151.7 -22.5C-138.5 -69 -135.1 -113 -111.5 -147.7C-87.8 -182.4 -43.9 -207.7 16.8 -227.7C77.6 -247.8 155.1 -262.5 216.7 -234.6" fill="#d87a7a"></path>
    </g>
  </svg>
</div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-[#4a3728] tracking-tight">
            Our Kitchen <span className="text-[#d87a7a]">Creations</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuData.map((category, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group p-2 bg-white border-2 border-[#d87a7a]/10 rounded-[2.5rem] hover:shadow-2xl hover:shadow-[#d87a7a]/20 transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              <div className="w-full h-64 rounded-[2rem] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-black text-[#4a3728] mb-4">
                  {category.title}
                </h3>
                
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="text-[#4a3728]/70 font-medium flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#d87a7a] rounded-full mr-3 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default MenuCategories;