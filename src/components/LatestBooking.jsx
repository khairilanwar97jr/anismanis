import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiFetch } from '../api';

const LatestOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await apiFetch('/api/orders/paid-orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const sendWhatsApp = (order) => {
    const itemsText = order.items.map(it => 
      `\n- ${it.quantity}x ${it.product_name}${it.addons?.length > 0 ? ` (Add-ons: ${it.addons.map(a => a.name).join(', ')})` : ''}`
    ).join('');
    
    const text = `Hi, I have a query about order #${order.id}.\n\nCustomer: ${order.customer_name}\nStatus: ${order.payment_status}${itemsText}`;
    window.open(`https://wa.me/601126913096?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -bottom-20 left-0 w-full z-0 pointer-events-none opacity-60">
        <svg viewBox="0 0 800 600" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 413L10.7 388.3C21.3 363.7 42.7 314.3 64.2 317.7C85.7 321 107.3 377 128.8 373.7C150.3 370.3 171.7 307.7 193 297.3C214.3 287 235.7 329 257 351.7C278.3 374.3 299.7 377.7 321.2 382.5C342.7 387.3 364.3 393.7 385.8 388.3C407.3 383 428.7 366 450 346.8C471.3 327.7 492.7 306.3 514.2 299.8C535.7 293.3 557.3 301.7 578.8 327.2C600.3 352.7 621.7 395.3 643 403.2C664.3 411 685.7 384 707 388.3C728.3 392.7 749.7 428.3 771.2 412.7C792.7 397 814.3 330 835.8 299C857.3 268 878.7 273 889.3 275.5L900 278L900 601L889.3 601C878.7 601 857.3 601 835.8 601C814.3 601 792.7 601 771.2 601C749.7 601 728.3 601 707 601C685.7 601 664.3 601 643 601C621.7 601 600.3 601 578.8 601C557.3 601 535.7 601 514.2 601C492.7 601 471.3 601 450 601C428.7 601 407.3 601 385.8 601C364.3 601 342.7 601 321.2 601C299.7 601 278.3 601 257 601C235.7 601 214.3 601 193 601C171.7 601 150.3 601 128.8 601C107.3 601 85.7 601 64.2 601C42.7 601 21.3 601 10.7 601L0 601Z" fill="#d87a7a" />
        </svg>
      </div>

      <motion.div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-[#4a3728] tracking-tight">
            Latest <span className="text-[#d87a7a]">Orders</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d87a7a] animate-pulse"></span>
            <span className="text-xs font-bold text-[#4a3728]/50 uppercase tracking-widest">Live Sync</span>
          </div>
        </div>

        {/* Mobile list (visible on small screens) */}
        <div className="md:hidden space-y-4">
          {orders.map((o) => (
            <div
              key={o.id}
              onClick={() => setSelectedOrder(o)}
              className="bg-white p-4 rounded-xl border border-[#d87a7a]/10 shadow-sm cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-black text-sm text-[#4a3728]">{o.customer_name}</p>
                  <p className="text-xs text-[#4a3728]/70">{new Date(o.order_date).toLocaleDateString()}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold uppercase text-[#d87a7a]">{o.payment_status}</p>
                  <p className="text-sm font-black text-[#4a3728]">{o.items.reduce((s,it)=>s + (it.quantity||0),0)} items</p>
                </div>
              </div>

              <div className="mt-3 text-sm text-[#4a3728]/80">
                {o.items.map((it, i) => (
                  <div key={i} className="truncate">{it.quantity}x {it.product_name}</div>
                ))}
              </div>

              <div className="mt-3 flex">
                <span className="animate-pulse px-3 py-1 bg-[#d87a7a]/20 text-[#4a3728] rounded-full text-xs font-bold uppercase">In the Making</span>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-hidden rounded-[2rem] border-2 border-[#d87a7a]/10 shadow-sm bg-white">
          <table className="w-full text-left">
            <thead className="bg-[#d87a7a]/5">
              <tr>
                <th className="p-6 text-[#4a3728] font-black uppercase text-sm tracking-widest">Date</th>
                <th className="p-6 text-[#4a3728] font-black uppercase text-sm tracking-widest">Guest</th>
                <th className="p-6 text-[#4a3728] font-black uppercase text-sm tracking-widest">Details</th>
                <th className="p-6 text-[#4a3728] font-black uppercase text-sm tracking-widest">In the Making</th>
                <th className="p-6 text-[#4a3728] font-black uppercase text-sm tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d87a7a]/10">
              {orders.map((o) => (
                <tr key={o.id} onClick={() => setSelectedOrder(o)} className="hover:bg-[#d87a7a]/5 transition-colors cursor-pointer">
                  <td className="p-6 text-[#4a3728]/70">{new Date(o.order_date).toLocaleDateString()}</td>
                  <td className="p-6 font-black text-[#4a3728]">{o.customer_name}</td>
                  <td className="p-6 text-[#4a3728]/80">{o.items.map((it, i) => <div key={i}>{it.quantity}x {it.product_name}</div>)}</td>
                  <td className="p-6"><span className="animate-pulse px-3 py-1 bg-[#d87a7a]/20 text-[#4a3728] rounded-full text-xs font-bold uppercase">In the Making</span></td>
                  <td className="p-6"><span className="px-3 py-1 bg-[#d87a7a]/10 text-[#d87a7a] rounded-full text-xs font-bold uppercase">{o.payment_status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Detail Pop-up Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#4a3728]/20 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl">
              <h3 className="text-2xl font-black text-[#4a3728] mb-1">Order Summary</h3>
              <p className="text-[#4a3728]/70 mb-6 font-bold">{selectedOrder.customer_name} • {new Date(selectedOrder.order_date).toLocaleDateString()}</p>
              
              <div className="space-y-4 mb-8">
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="bg-[#d87a7a]/5 p-4 rounded-xl">
                    <p className="font-black text-[#4a3728]">{it.quantity}x {it.product_name}</p>
                    {it.addons?.map((a, j) => <p key={j} className="text-xs text-[#d87a7a] font-bold mt-1">+ {a.name}</p>)}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button onClick={() => sendWhatsApp(selectedOrder)} className="flex-1 bg-[#25d366] text-white py-3 rounded-full font-bold">WhatsApp Support</button>
                <button onClick={() => setSelectedOrder(null)} className="flex-1 bg-[#d87a7a]/10 text-[#d87a7a] py-3 rounded-full font-bold">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LatestOrders;