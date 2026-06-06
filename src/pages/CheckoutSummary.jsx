import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CheckoutSummary = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the data saved from ProductDetail
    const savedOrder = JSON.parse(localStorage.getItem('pendingOrder'));
    setOrder(savedOrder);
  }, []);

  const initiateBillplzPayment = async () => {
    // In the future, this is where you call your backend/serverless function
    alert("Proceeding to Billplz secure payment...");
  };

  if (!order) return <div className="p-16">Loading order details...</div>;

  return (
    <div className="min-h-screen bg-white text-[#4a3728]">
      <Navbar />
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Order Review</h1>
        
        <div className="border border-[#4a3728]/20 p-8 space-y-6">
          <div className="flex justify-between font-bold text-lg">
            <span>{order.productName}</span>
            <span>RM {order.price.toFixed(2)}</span>
          </div>
          <div className="text-sm space-y-2 opacity-80">
            <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
            <p><strong>Add-on:</strong> {order.addOns}</p>
            <p><strong>Gift Note:</strong> {order.giftNote || "None"}</p>
          </div>
          <div className="border-t border-[#4a3728]/10 pt-6 flex justify-between text-xl font-black">
            <span>Total</span>
            <span>RM {order.price.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={initiateBillplzPayment}
          className="w-full mt-8 bg-[#4a3728] text-white py-6 font-black uppercase tracking-widest hover:bg-[#d87a7a] transition-all"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummary;