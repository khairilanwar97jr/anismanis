import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // Added useLocation here
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import kekBrownies from '../assets/kekbrownies.png';
import kekMarble from '../assets/kekmarble.png';
import pandan from '../assets/pandan.png';

const PRODUCTS = [
  { id: '1', name: 'Chocolate Mudslide', price: 100, image: kekMarble, desc: 'Crafted with 24-hour fermented sourdough and premium dark chocolate.' },
  { id: '2', name: 'Kek Pandan', price: 90, image: pandan, desc: 'A fragrant, airy delight infused with fresh pandan extract and coconut milk.' },
  { id: '3', name: 'Brownies', price: 80, image: kekBrownies, desc: 'Decadent, fudgy, and rich—the perfect companion for your coffee.' },
];

const ProductDetail = () => {
  const { addToCart, items, updateItem } = useCart(); // Added updateItem
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const product = PRODUCTS.find((p) => p.id === id);

  // Check if we are editing
  const editIndex = location.state?.editIndex;
  const isEditing = editIndex !== undefined;

  // Use useEffect to pre-fill the form ONLY if editing
  const [quantity, setQuantity] = useState(1);
  const [addOns, setAddOns] = useState('None');
  const [giftNote, setGiftNote] = useState('');

  useEffect(() => {
    if (isEditing && items[editIndex]) {
      const item = items[editIndex];
      setQuantity(item.quantity);
      setAddOns(item.addOns);
      setGiftNote(item.giftNote || '');
    }
  }, [isEditing, editIndex, items]);

  const handleProceed = () => {
    const productData = {
      product_id: product.id,
      productName: product.name,
      price: product.price,
      quantity,
      addOns,
      giftNote
    };

    if (isEditing) {
      updateItem(editIndex, productData);
    } else {
      addToCart(productData);
    }
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white text-[#4a3728]">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Left: Image & Highlights */}
          <div className="space-y-8">
            <div className="aspect-[3/4] bg-[#f9f5f2] border border-[#4a3728]/10 flex items-center justify-center overflow-hidden">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Premium Highlights */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 border border-[#4a3728]/10 text-center">
                  <p className="font-black text-xs uppercase">Small Batch</p>
               </div>
               <div className="p-4 border border-[#4a3728]/10 text-center">
                  <p className="font-black text-xs uppercase">Freshly Baked</p>
               </div>
            </div>
          </div>

          {/* Right: Order Form */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-black italic tracking-tighter mb-2">{product.name}</h1>
            <p className="text-2xl font-black mb-6 text-[#d87a7a]">RM {product.price.toFixed(2)}</p>
            <p className="text-[#4a3728]/70 mb-8 leading-relaxed">{product.desc}</p>

            <div className="space-y-8 border-t border-[#4a3728]/10 pt-8">

              {/* Quantity */}
              <div>
                <label className="block font-bold uppercase tracking-widest text-xs mb-3">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  className="w-full border border-[#4a3728]/20 p-4 font-bold text-sm bg-transparent"
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>

              {/* Add-ons */}
              <div>
                <label className="block font-bold uppercase tracking-widest text-xs mb-3">Premium Add-ons</label>
                <select
                  className="w-full border border-[#4a3728]/20 p-4 font-bold text-sm bg-transparent uppercase"
                  value={addOns}
                  onChange={(e) => setAddOns(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="Artisan Candles">Artisan Candles (+RM 5)</option>
                  <option value="Gift Ribbon">Gift Ribbon (+RM 2)</option>
                </select>
              </div>

              {/* Gift Note */}
              <div>
                <label className="block font-bold uppercase tracking-widest text-xs mb-3">Personalized Gift Note</label>
                <textarea
                  className="w-full border border-[#4a3728]/20 p-4 font-medium text-sm h-24 bg-transparent"
                  placeholder="Include a message for your recipient..."
                  onChange={(e) => setGiftNote(e.target.value)}
                />
              </div>

{/* Change the button text dynamically */}
  <button
    onClick={handleProceed}
    className="w-full bg-[#4a3728] text-white py-6 font-black uppercase tracking-widest hover:bg-[#d87a7a] transition-all"
  >
    {isEditing ? 'Save Changes' : 'Add to Cart'}
  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;