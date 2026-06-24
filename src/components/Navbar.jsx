import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import this

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart(); // Get items from context
  const navigate = useNavigate();

  return (
    <nav className="pt-6 bg-[#d87a7a]">
      <div className="px-6 md:px-12 py-8 flex items-center justify-between w-full">

        {/* Logo */}
        <Link to="/">
          <h1 style={{ fontFamily: "'Fraunces', serif" }}
            className="text-4xl md:text-6xl font-black text-white italic leading-none tracking-tighter drop-shadow-md">
            Strawberry Cream
          </h1>
          <p className="text-sm md:text-base tracking-[0.5em] text-white/90 uppercase font-bold mt-3">
           Cafe
          </p>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-12 text-white font-bold text-lg uppercase tracking-[0.2em]">
          <Link to="/provisions">Shop</Link>
          <Link to="/our-story">Story</Link>
          <Link to="/gift-box">Gifts</Link>
          {/* Cart Link with Badge */}
          <Link to="/cart" className="relative flex items-center hover:text-[#4a3728] transition-all">
            Cart
            {items.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#FFD700] text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">
                {items.length}
              </span>
            )}
          </Link>
        </ul>

        {/* Desktop Button */}
        <button onClick={() => navigate('/provisions')} className="hidden md:block bg-white hover:bg-[#4a3728] text-[#4a3728] hover:text-white border-2 border-white text-lg font-black px-12 py-5 transition-all shadow-xl uppercase tracking-widest">
          Order Now
        </button>

        {/* Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-2">
          <span className={`block w-9 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
          <span className={`block w-9 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-9 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#e5a9a9] px-6 py-10 flex flex-col gap-8 text-white font-bold text-2xl uppercase tracking-widest text-center border-t border-white/20">
          <Link onClick={() => setIsOpen(false)} to="/provisions">Shop Cookies</Link>
          <Link onClick={() => setIsOpen(false)} to="/our-story">Our Story</Link>
          <Link onClick={() => setIsOpen(false)} to="/gift-box">Gift Boxes</Link>
          <Link onClick={() => setIsOpen(false)} to="/cart">View Cart ({items.length})</Link>
          <button onClick={() => { setIsOpen(false); navigate('/provisions'); }} className="bg-white text-[#4a3728] font-black text-lg px-10 py-5 w-full uppercase tracking-widest">
            Order Now
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;