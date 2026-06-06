import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';


const ProductDetail = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [deliveryDate, setDeliveryDate] = useState('');
  const [addOns, setAddOns] = useState('None'); // This was missing
  const [giftNote, setGiftNote] = useState('');


  const handleProceed = () => {
  const orderData = {
    productName: "Chocolate Mudslide",
    price: 150.00,
    deliveryDate, // state variable from date input
    addOns,       // state variable from select
    giftNote      // state variable from textarea
  };
  // Store data so CheckoutSummary can read it
  localStorage.setItem('pendingOrder', JSON.stringify(orderData));
  navigate('/checkout-summary');
};
  
  return (
    <div className="min-h-screen bg-white text-[#4a3728]">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Left: Image & Story */}
          <div className="space-y-8">
            <div className="aspect-[3/4] bg-[#f9f5f2] border border-[#4a3728]/10 flex items-center justify-center">
              <span className="font-black opacity-20 uppercase tracking-widest">Product Image</span>
            </div>
            <div>
              <h3 className="font-black uppercase tracking-widest mb-2">Our Story</h3>
              <p className="text-[#4a3728]/80 leading-relaxed">
                Crafted with 24-hour fermented sourdough and premium dark chocolate, this mudslide is the definition of artisan indulgence.
              </p>
            </div>
          </div>

          {/* Right: Order Form */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-black italic tracking-tighter mb-2">Chocolate Mudslide</h1>
            <p className="text-2xl font-black mb-8">RM 150.00</p>
            
            <div className="space-y-8 border-t border-[#4a3728]/10 pt-8">
              
              {/* Delivery Date */}
              <div>
                <label className="block font-bold uppercase tracking-widest text-xs mb-3">Select Delivery Date</label>
                <input 
                  type="date" 
                  className="w-full border border-[#4a3728]/20 p-4 font-bold text-sm bg-transparent"
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>

              {/* Add-ons */}
              <div>
                <label className="block font-bold uppercase tracking-widest text-xs mb-3">Premium Add-ons</label>
{/* Update this part in your JSX */}
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
                  placeholder="Write a message for your recipient..."
                  onChange={(e) => setGiftNote(e.target.value)}
                />
              </div>

              {/* Proceed Button */}
<button 
      onClick={handleProceed} // Ensure this is exactly like this
      className="w-full bg-[#4a3728] text-white py-6 font-black uppercase tracking-widest hover:bg-[#d87a7a] transition-all"
    >
      Proceed to Checkout
    </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;