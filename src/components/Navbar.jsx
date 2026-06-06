import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="pt-6 bg-[#e5a9a9]">
      <div className="px-6 md:px-12 py-8 flex items-center justify-between w-full">
        
        {/* Logo - Premium Styling */}
        <Link to="/">
          <h1 style={{ fontFamily: "'Fraunces', serif" }}
              className="text-5xl md:text-6xl font-black text-white italic leading-none tracking-tighter drop-shadow-md">
            Anismanis
          </h1>
          <p className="text-sm md:text-base tracking-[0.5em] text-white/90 uppercase font-bold mt-3">
            Cookie Studio
          </p>
        </Link>

        {/* Desktop Links - Updated with Links */}
        <ul className="hidden md:flex items-center gap-16 text-white font-bold text-lg uppercase tracking-[0.2em]">
          <li className="hover:text-[#4a3728] transition-all duration-300 cursor-pointer">
            <Link to="/provisions">Shop Cookies</Link>
          </li>
          <li className="hover:text-[#4a3728] transition-all duration-300 cursor-pointer">Our Story</li>
          <li className="hover:text-[#4a3728] transition-all duration-300 cursor-pointer">Gift Boxes</li>
        </ul>

        {/* Desktop Button */}
        <button className="hidden md:block bg-white hover:bg-[#4a3728] text-[#4a3728] hover:text-white border-2 border-white text-lg font-black px-12 py-5 transition-all duration-300 shadow-xl uppercase tracking-widest">
          Order Now
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-2 focus:outline-none">
          <span className={`block w-9 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
          <span className={`block w-9 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-9 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu - Updated with Links */}
      {isOpen && (
        <div className="md:hidden bg-[#e5a9a9] px-6 py-10 flex flex-col gap-8 text-white font-bold text-2xl uppercase tracking-widest text-center">
          <Link onClick={() => setIsOpen(false)} to="/provisions">Shop Cookies</Link>
          <li className="list-none hover:text-[#4a3728] transition-all duration-300 cursor-pointer">Our Story</li>
          <li className="list-none hover:text-[#4a3728] transition-all duration-300 cursor-pointer">Gift Boxes</li>
          <button className="bg-white text-[#4a3728] font-black text-lg px-10 py-5 transition-all duration-300 w-full uppercase tracking-widest">
            Order Now
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;