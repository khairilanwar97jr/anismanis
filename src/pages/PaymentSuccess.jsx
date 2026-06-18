import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiFetch } from '../api';

const PROCESSING_FEE = 1.25;
const WHATSAPP_PHONE = '60173469335';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  const fetchOrder = async (maxRetries = 8) => {
    if (!orderId) {
      setError('Missing order ID.');
      setLoading(false);
      return;
    }

    // This loop handles the "keep trying" logic
    for (let i = 0; i < maxRetries; i++) {
      try {
        const res = await apiFetch(`/api/orders/${orderId}/success`);
        
        // If the server responds with 200 OK
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setOrder(data);
            setLoading(false);
            return; // Exit the loop on success
          }
        }
      } catch (err) {
        // Silently log or ignore individual failures during polling
        console.warn(`Attempt ${i + 1} failed, retrying...`);
      }

      // Wait 2 seconds before the next try
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Only set error after all retries have been exhausted
    setError('Unable to load receipt. Please check your payment status or contact us.');
    setLoading(false);
  };

  fetchOrder();
}, [orderId]);

  const cartTotal = useMemo(() => {
    if (!order?.items) return 0;

    return order.items.reduce((sum, item) => {
      const itemPriceTotal = Number(item.price || 0) * Number(item.quantity || 1);
      const addonsTotal = (item.addons || []).reduce(
        (addonSum, addon) => addonSum + Number(addon.price || 0) * Number(addon.quantity || 1),
        0
      );

      return sum + itemPriceTotal + addonsTotal;
    }, 0);
  }, [order]);

  const deliveryFee = Number(order?.delivery_fee || 0);

  const totalAmount = useMemo(() => {
    const grand = order?.grand_total;
    const totalAmt = order?.total_amount;

    if (grand !== undefined && grand !== null && String(grand) !== '') {
      const n = Number(grand);
      if (!Number.isNaN(n)) return n + PROCESSING_FEE;
    }

    if (totalAmt !== undefined && totalAmt !== null && String(totalAmt) !== '') {
      const n = Number(totalAmt);
      if (!Number.isNaN(n)) return n;
    }

    return cartTotal + deliveryFee + PROCESSING_FEE;
  }, [order, cartTotal, deliveryFee]);

  const receiptUrl =
    typeof window !== 'undefined' && orderId
      ? `${window.location.origin}/payment/success?order_id=${orderId}`
      : '';

  const whatsappMessage = useMemo(() => {
    if (!order) return '';

    const itemLines = (order.items || []).map((item, index) => {
      const addons = (item.addons || [])
        .map(addon => {
          const perUnitAddon = Number(addon.price || 0);
          const addonCount = Number(addon.quantity || 1);
          const totalAddonForItem = perUnitAddon * addonCount;
          return `  + ${addon.name} x${addonCount} - RM ${perUnitAddon.toFixed(2)} (RM ${totalAddonForItem.toFixed(2)} total)`;
        })
        .join('\n');

      return [
        `${index + 1}. ${item.product_name || 'Cake'} x${item.quantity}`,
        item.image_url ? `   Image: ${item.image_url}` : '',
        `   Cake - RM ${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}`,
        addons,
        item.message ? `   Note: ${item.message}` : ''
      ].filter(Boolean).join('\n');
    }).join('\n\n');

    return [
      'AnisManis Order Receipt',
      `Order ID: ${order.id}`,
      `Status: ${order.status}`,
      '',
      `Name: ${order.guest_name}`,
      `Phone: ${order.guest_phone}`,
      `Email: ${order.guest_email}`,
      '',
      `Delivery Type: ${order.delivery_type}`,
      `Address: ${order.delivery_address}`,
      '',
      itemLines,
      '',
      `Cart Total: RM ${cartTotal.toFixed(2)}`,
      `Delivery Fee: RM ${deliveryFee.toFixed(2)}`,
      `Online Processing Fee: RM ${PROCESSING_FEE.toFixed(2)}`,
      `Total Paid: RM ${totalAmount.toFixed(2)}`,
      '',
      `Receipt Link: ${receiptUrl}`
    ].join('\n');
  }, [cartTotal, deliveryFee, order, receiptUrl, totalAmount]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

if (loading) {
    return (
      <div className="min-h-screen bg-white text-[#4a3728] flex items-center justify-center p-4">
        <div className="text-center w-full">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-[#4a3728]/10 border-t-[#d87a7a] rounded-full animate-spin mx-auto mb-6"></div>
          
          {/* Text and Animation */}
          <h2 className="text-xl font-black uppercase tracking-widest text-[#4a3728]">
            Verifying Payment
          </h2>
          
          <div className="flex justify-center items-center gap-0.5 mt-2 text-[#d87a7a] font-bold">
            <span className="text-sm">Please wait</span>
            <span className="flex gap-0.5 text-2xl -mt-4">
              <span className="animate-pulse delay-75">.</span>
              <span className="animate-pulse delay-150">.</span>
              <span className="animate-pulse delay-300">.</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9f5f2] text-[#4a3728]">
        <div className="container mx-auto px-4 py-24 max-w-lg text-center">
          <h1 className="text-3xl font-black uppercase mb-3">Receipt Not Found</h1>
          <p className="text-sm font-medium opacity-70 mb-8">{error}</p>
          <Link to="/provisions" className="inline-block bg-[#4a3728] text-white px-8 py-4 font-black uppercase">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f5f2] text-[#4a3728]">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <div className="bg-white p-6 md:p-8 border border-[#4a3728]/10 shadow-sm">
          <div className="text-center mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d87a7a] mb-2">
              Payment {order.status || 'Complete'}
            </p>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Order Receipt
            </h1>
            <p className="text-xs font-bold opacity-50 mt-2 break-all">{order.id}</p>
          </div>

          <div className="space-y-6 mb-8">
            {order.items?.map((item, index) => {
              const addonsTotal = (item.addons || []).reduce(
                (sum, addon) => sum + Number(addon.price || 0) * Number(addon.quantity || 1),
                0
              );
              const itemTotal = Number(item.price || 0) * Number(item.quantity || 1) + addonsTotal;

              return (
                <div key={index} className="border-b border-[#4a3728]/10 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#f9f5f2] border border-[#4a3728]/10 flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image_url || "https://via.placeholder.com/80"}
                        alt={item.product_name || 'Cake'}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate font-bold uppercase text-sm">
                            {item.product_name || 'Cake'}
                          </p>
                          <p className="text-[10px] opacity-50 font-bold uppercase">Qty: {item.quantity}</p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Item Total</p>
                          <span className="text-[#d87a7a] font-black">RM {itemTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="mt-2 space-y-1 text-[10px] font-bold uppercase opacity-70">
                        <p>Cake: RM {(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}</p>
                        {item.addons?.map((addon, addonIndex) => {
                          const perUnitAddon = Number(addon.price || 0);
                          const addonCount = Number(addon.quantity || 1);
                          const totalAddonForItem = perUnitAddon * addonCount;
                          return (
                            <p key={addonIndex}>
                              Add-on: RM {perUnitAddon.toFixed(2)} x{addonCount} = RM {totalAddonForItem.toFixed(2)}
                            </p>
                          );
                        })}
                      </div>

                      {item.addons?.map((addon, addonIndex) => (
                        <div
                          key={addonIndex}
                          className="inline-flex items-center text-[10px] text-[#d87a7a] font-black uppercase mt-2 mr-2 bg-[#d87a7a]/5 px-2 py-1 rounded"
                        >
                          + {addon.name}
                        </div>
                      ))}

                      {item.message && (
                        <p className="text-[10px] italic text-[#4a3728]/70 mt-2 truncate">"{item.message}"</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t-2 border-dashed border-[#4a3728]/20 py-6 space-y-3">
            <div className="flex justify-between text-sm font-bold uppercase opacity-80">
              <span>Cart Total</span>
              <span>RM {cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold uppercase opacity-80">
              <span>Delivery Fee</span>
              <span>RM {deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold uppercase opacity-80">
              <span>Online Processing Fee</span>
              <span>RM {PROCESSING_FEE.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-[#4a3728]/20 pt-8 space-y-8">
            <div>
              <p className="font-black text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3">Contact</p>
              <p className="font-bold text-sm">{order.guest_name}</p>
              <p className="text-sm opacity-80 break-all">{order.guest_phone} / {order.guest_email}</p>
            </div>

            <div>
              <p className="font-black text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3">
                {order.delivery_type === 'DELIVERY' ? 'Shipping Address' : 'Pickup Location'}
              </p>
              <p className="font-bold text-sm leading-relaxed bg-[#f9f5f2] p-3 rounded-xl border border-[#4a3728]/10">
                {order.delivery_address}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mt-8 pt-6 border-t border-[#4a3728]/10 gap-2">
            <span className="font-black text-lg uppercase tracking-tighter">Total Paid</span>
            <span className="font-black text-3xl tracking-tighter text-[#d87a7a]">RM {totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="block text-center w-full bg-[#25D366] text-white py-5 rounded-full font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02]"
          >
            Send to WhatsApp
          </a>

          <Link
            to="/provisions"
            className="block text-center w-full bg-[#d87a7a] text-white py-5 rounded-full font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
