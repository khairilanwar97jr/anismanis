import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

import kekBrownies from '../assets/kekbrownies.png';
import kekMarble from '../assets/kekmarble.png';
import pandan from '../assets/pandan.png';

const PRODUCTS = [
  { id: '1', name: 'Chocolate Mudslide', price: 100, image: kekMarble },
  { id: '2', name: 'Kek Pandan', price: 90, image: pandan },
  { id: '3', name: 'Brownies', price: 80, image: kekBrownies },
];

const CheckoutSummary = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const PROCESSING_FEE = 1.50;
  const addonPrices = { 'None': 0, 'Artisan Candles': 5, 'Gift Ribbon': 2 };

  const getProductImage = (name) => {
    const product = PRODUCTS.find(p => p.name === name);
    return product ? product.image : null;
  };

  const {
    deliveryDetails,
    customerInfo,
    total: cartTotal,
    deliveryType,
    isLocated,
    deliveryDate: initialDate
  } = location.state || {
    deliveryDetails: { address: '', postcode: '', city: '', state: '', fee: 0 },
    customerInfo: { name: '', phone: '', email: '' },
    total: 0,
    deliveryType: 'PICKUP',
    isLocated: false,
    deliveryDate: ''
  };

  const finalTotal = cartTotal + PROCESSING_FEE;
  const [deliveryDate, setDeliveryDate] = useState(initialDate || '');

  const handleBack = () => {
    navigate('/cart', {
      state: { deliveryDetails, customerInfo, deliveryType, isLocated, deliveryDate }
    });
  };


  // Add this function to format and "send" your data
  const handleConfirm = () => {
    const orderPayload = {
      guest_name: customerInfo.name,
      guest_email: customerInfo.email,
      guest_phone: customerInfo.phone,
      delivery_type: deliveryType,
      delivery_address: deliveryType === 'DELIVERY'
        ? `${deliveryDetails.address}, ${deliveryDetails.postcode} ${deliveryDetails.city}, ${deliveryDetails.state}`
        : "AnisManis Studio, Jalan Bumi U5/137, Pangsapuri Pelangi",
      delivery_lat: deliveryDetails.lat || 0, // Ensure these are defined in your cart/checkout flow
      delivery_lng: deliveryDetails.lng || 0,
      items: items.map(item => ({
        product_id: item.product_id, // Ensure this exists in your item object
        quantity: item.quantity
      }))
    };

    // Replace this console.log with your API call (fetch)
    console.log("Order Data:", JSON.stringify(orderPayload, null, 2));
    alert("Order confirmed! Check the console for the JSON data.");
  };

  return (
    <div className="min-h-screen bg-[#f9f5f2] text-[#4a3728]">
      <div className="bg-[#d87a7a] p-8 md:px-16 flex items-center shadow-sm">
        <button onClick={handleBack} className="font-black uppercase tracking-[0.2em] text-xs text-white hover:opacity-70 transition-opacity">
          ← Back to Cart
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg">
  <div className="bg-white p-6 md:p-8 border border-[#4a3728]/10 shadow-sm">
    <h1 className="text-center text-2xl md:text-3xl font-black uppercase tracking-tighter text-[#4a3728] mb-8">
      Order <span className="text-[#d87a7a]">Review</span>
    </h1>
    
    {/* ITEMS LIST - Optimized for mobile readability */}
    <div className="space-y-6 mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="w-16 h-16 bg-[#f9f5f2] border border-[#4a3728]/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img src={getProductImage(item.productName)} alt={item.productName} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between font-bold uppercase text-sm gap-1">
              <p className="truncate">{item.productName}</p>
              <span className="text-[#d87a7a] font-black">RM {(item.price * item.quantity).toFixed(2)}</span>
            </div>
            
            <p className="text-[10px] opacity-50 font-bold uppercase">Qty: {item.quantity}</p>
            
            {item.addOns !== 'None' && (
              <div className="flex justify-between items-center text-[10px] text-[#d87a7a] font-black uppercase mt-1 bg-[#d87a7a]/5 px-2 py-1 rounded">
                <span>+ {item.addOns}</span>
                <span className="opacity-70 font-medium">
                  {item.addOns === 'Artisan Candles' ? '(RM 5.00)' : '(RM 2.00)'}
                </span>
              </div>
            )}
            
            {item.giftNote && (
              <p className="text-[10px] italic text-[#4a3728]/70 mt-1 truncate">"{item.giftNote}"</p>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* FEES - Clean table-like structure */}
    <div className="border-t-2 border-dashed border-[#4a3728]/20 py-6 space-y-3">
      <div className="flex justify-between text-sm font-bold uppercase opacity-80">
        <span>Delivery Fee</span>
        <span>RM {deliveryDetails.fee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm font-bold uppercase opacity-80">
        <span>Processing Fee</span>
        <span>RM {PROCESSING_FEE.toFixed(2)}</span>
      </div>
    </div>
    
    {/* INFO SECTION - Better spacing for touch/reading */}
    <div className="border-t-2 border-dashed border-[#4a3728]/20 pt-8 space-y-8">
      <div>
        <p className="font-black text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3">Contact</p>
        <p className="font-bold text-sm">{customerInfo.name}</p>
        <p className="text-sm opacity-80 break-all">{customerInfo.phone} / {customerInfo.email}</p>
      </div>

      <div>
        <p className="font-black text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3">Delivery Date</p>
        <input 
          type="date" 
          value={deliveryDate} 
          onChange={(e) => setDeliveryDate(e.target.value)} 
          className="w-full bg-[#f9f5f2] p-3 rounded-xl border border-[#4a3728]/10 outline-none font-bold text-sm text-[#4a3728] focus:border-[#d87a7a]" 
        />
      </div>

      <div>
        <p className="font-black text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3">
          {deliveryType === 'DELIVERY' ? 'Shipping Address' : 'Pickup Location'}
        </p>
        <p className="font-bold text-sm leading-relaxed bg-[#f9f5f2] p-3 rounded-xl border border-[#4a3728]/10">
          {deliveryType === 'DELIVERY' ? `${deliveryDetails.address}, ${deliveryDetails.postcode} ${deliveryDetails.city}, ${deliveryDetails.state}` : "AnisManis Studio, Jalan Bumi U5/137, Pangsapuri Pelangi"}
        </p>
      </div>
    </div>

    {/* TOTAL */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mt-8 pt-6 border-t border-[#4a3728]/10 gap-2">
      <span className="font-black text-lg uppercase tracking-tighter">Total Payable</span>
      <span className="font-black text-3xl tracking-tighter text-[#d87a7a]">RM {finalTotal.toFixed(2)}</span>
    </div>
  </div>

  <button 
    onClick={handleConfirm}
    className="w-full mt-6 bg-[#d87a7a] text-white py-5 rounded-full font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform"
  >
    Confirm & Pay RM {finalTotal.toFixed(2)}
  </button>
</div>
</div>
  );
};

export default CheckoutSummary;