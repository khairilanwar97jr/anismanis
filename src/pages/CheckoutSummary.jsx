import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiFetch } from '../api';

import kekBrownies from '../assets/kekbrownies.png';
import kekMarble from '../assets/kekmarble.png';
import pandan from '../assets/pandan.png';

const PRODUCTS = [
  { id: '38dfefb2-b68b-4899-b5ab-40836eacfaa0', name: 'Chocolate Mudslide', price: 100, image: kekMarble },
  { id: '2', name: 'Kek Pandan', price: 90, image: pandan },
  { id: '3', name: 'Brownies', price: 80, image: kekBrownies },
];

const CheckoutSummary = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // New state for modal and loading
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // 1. First Action: Button clicks, loads for 2s, then opens modal
  const handleInitialClick = () => {
    setIsLoadingButton(true);

    setTimeout(() => {
      setIsLoadingButton(false);
      setIsModalOpen(true);
    }, 1500);
  };

  const PROCESSING_FEE = 1.25;

  const getProductImage = (name) => {
    const product = PRODUCTS.find(p => p.name === name);
    return product ? product.image : null;
  };

  const getItemAddon = (item) => item.addOns?.[0] || item.addon || null;

  const getItemImage = (item) => item.image_url || getProductImage(item.productName) || "https://via.placeholder.com/80";

  const getItemBaseTotal = (item) => Number(item.price) * Number(item.quantity);

const getItemAddonsTotal = (item) => {
    const getTotalQuantity = (addon) => {
      if (addon?.quantity !== undefined && addon?.quantity !== null) {
        return Number(addon.quantity);
      }
      return Number(item.quantity || 1);
    };

    if (item.addOns && item.addOns.length) {
      return item.addOns.reduce((s, a) => s + Number(a.price || 0) * getTotalQuantity(a), 0);
    }
    if (item.addon) {
      return Number(item.addon.price || 0) * getTotalQuantity(item.addon);
    }
    return 0;
  };
 
  const getItemLineTotal = (item) => {
    const addonsTotal = getItemAddonsTotal(item);
    return Number(item.price || 0) * Number(item.quantity || 1) + addonsTotal;
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

  const itemsTotal = items.reduce((sum, item) => sum + getItemLineTotal(item), 0);
  const orderTotal = itemsTotal + Number(deliveryDetails.fee || 0);
  const finalTotal = orderTotal + PROCESSING_FEE;
  // This sets the default to today's date if initialDate is missing
  const [deliveryDate, setDeliveryDate] = useState(
    initialDate || new Date().toISOString().split('T')[0]
  );

  const handleBack = () => {
    navigate('/cart', {
      state: { deliveryDetails, customerInfo, deliveryType, isLocated, deliveryDate }
    });
  };

  // 2. Final Action: Modal button clicked, sends API
const handleFinalConfirm = async () => {
  const orderPayload = {
    guest_name: customerInfo.name,
    guest_email: customerInfo.email,
    guest_phone: customerInfo.phone,
    delivery_type: deliveryType,

    delivery_address:
      deliveryType === 'DELIVERY'
        ? `${deliveryDetails.address}, ${deliveryDetails.postcode} ${deliveryDetails.city}, ${deliveryDetails.state}`
        : "AnisManis Studio, Jalan Bumi U5/137, Pangsapuri Pelangi",

    delivery_lat: deliveryDetails.lat || null,
    delivery_lng: deliveryDetails.lng || null,

    items: items.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      message: item.giftNote || null,
      addons: item.addOns?.map(addon => ({
        addon_id: addon.id,
        quantity: item.quantity
      })) || []
    }))
  };

  try {
    setIsLoadingButton(true);

    const res = await apiFetch('/api/orders', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderPayload)
    });

    const data = await res.json();
    const orderId = data.order_id || data.id;

    console.log("ORDER RESPONSE:", data);

    if (!res.ok || !orderId) {
      throw new Error(data.message || "Order created without an order ID");
    }

    const paymentRes = await apiFetch('/api/payments/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ order_id: orderId })
    });

    const paymentData = await paymentRes.json();

    console.log("PAYMENT RESPONSE:", paymentData);

    if (!paymentRes.ok) {
      throw new Error(paymentData.message || "Payment creation failed");
    }

    const paymentUrl =
      paymentData.payment_url ||
      paymentData.bill_url ||
      paymentData.url ||
      paymentData.payment?.url ||
      paymentData.bill?.url;

    if (paymentUrl) {
      window.location.href = paymentUrl;
      return;
    }

    throw new Error("Payment created without a Billplz URL");

  } catch (err) {
    console.error(err);
    alert(err.message || "Order failed");
  } finally {
    setIsLoadingButton(false);
  }
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
            {items.map((item, index) => {
              const addon = getItemAddon(item);
              const baseTotal = getItemBaseTotal(item);
              const addonTotal = getItemAddonsTotal(item);
              const addonCount = addon ? (addon.quantity !== undefined && addon.quantity !== null ? Number(addon.quantity) : Number(item.quantity)) : 0;
              const perUnitAddon = addon ? Number(addon.price || 0) : 0;
              const perItemAddonTotal = perUnitAddon * addonCount;
              const lineTotal = getItemLineTotal(item);

              return (
              <div key={index} className="flex gap-4">
                <div className="w-16 h-16 bg-[#f9f5f2] border border-[#4a3728]/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={getItemImage(item)} alt={item.productName} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-bold uppercase text-sm">{item.productName}</p>
                      <p className="text-[10px] opacity-50 font-bold uppercase">Qty: {item.quantity}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Item Total</p>
                      <span className="text-[#d87a7a] font-black">RM {lineTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1 text-[10px] font-bold uppercase opacity-70">
                    <p>Cake: RM {baseTotal.toFixed(2)}</p>
                    {addon && (
                      <>
                        <p>Add-on: RM {perUnitAddon.toFixed(2)} x{addonCount} = RM {perItemAddonTotal.toFixed(2)}</p>
                      </>
                    )}
                  </div>

                  {addon && (
                    <div className="inline-flex items-center text-[10px] text-[#d87a7a] font-black uppercase mt-2 bg-[#d87a7a]/5 px-2 py-1 rounded">
                      <span>+ {addon.name}</span>
                    </div>
                  )}

                  {item.giftNote && (
                    <p className="text-[10px] italic text-[#4a3728]/70 mt-1 truncate">"{item.giftNote}"</p>
                  )}
                </div>
              </div>
              );
            })}
          </div>

          {/* FEES - Clean table-like structure */}
          <div className="border-t-2 border-dashed border-[#4a3728]/20 py-6 space-y-3">
            <div className="flex justify-between text-sm font-bold uppercase opacity-80">
              <span>Cart Total</span>
              <span>RM {itemsTotal.toFixed(2)}</span>
            </div>
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
              <p className="font-black text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3">Order Date</p>
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
          onClick={handleInitialClick}
          disabled={isLoadingButton}
          className={`w-full mt-6 bg-[#d87a7a] text-white py-5 rounded-full font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center ${isLoadingButton ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
        >
          {isLoadingButton ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </div>
          ) : (
            `Confirm & Pay RM ${finalTotal.toFixed(2)}`
          )}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#4a3728]/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-xs w-full text-center">
            <h2 className="font-black text-lg uppercase mb-6 text-[#4a3728]">Confirm Payment</h2>
            <div className="space-y-3">
              <button
                onClick={handleFinalConfirm}
                disabled={isLoadingButton}
                className={`w-full py-4 rounded-full font-black uppercase tracking-wider flex items-center justify-center ${isLoadingButton ? 'bg-[#d87a7a]/60 cursor-not-allowed text-white' : 'bg-[#d87a7a] text-white hover:opacity-90'}`}
                aria-busy={isLoadingButton}
              >
                {isLoadingButton ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Pay Now'
                )}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-transparent text-[#4a3728] font-bold py-2 opacity-50 uppercase text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSummary;
