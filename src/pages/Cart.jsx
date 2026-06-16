import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import kekBrownies from '../assets/kekbrownies.png';
import kekMarble from '../assets/kekmarble.png';
import pandan from '../assets/pandan.png';
import signboard from '../assets/signboard.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PRODUCTS = [
  { id: '1', name: 'Chocolate Mudslide', price: 100, image: kekMarble },
  { id: '2', name: 'Kek Pandan', price: 90, image: pandan },
  { id: '3', name: 'Brownies', price: 80, image: kekBrownies },
];

const SHOP_COORDS = [3.1761739896247194, 101.54584049504571];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const getDeliveryFee = (dist) => {
  if (dist <= 3) return 5;
  if (dist <= 8) return 10;
  if (dist <= 15) return 15;
  return 20;
};

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => { map.setView(center, 13); }, [center, map]);
  return null;
}

function ShopMarker() {
  const shopIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41],
  });
  return <Marker position={SHOP_COORDS} icon={shopIcon} />;
}

function LocationMarker({ onCoordsChange }) {
  const [position, setPosition] = useState(SHOP_COORDS);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onCoordsChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return <Marker position={position} />;
}

const Cart = () => {
  const { items, removeFromCart, updateQuantity, setItems } = useCart(); // Assuming setItems is available in context
  const navigate = useNavigate();
  const location = useLocation();

  const [customerInfo, setCustomerInfo] = useState(location.state?.customerInfo || { name: '', phone: '', email: '' });
  const [deliveryType, setDeliveryType] = useState(location.state?.deliveryType || 'PICKUP');
  const [deliveryDetails, setDeliveryDetails] = useState(location.state?.deliveryDetails || {
    address: '', postcode: '', city: '', state: '', lat: SHOP_COORDS[0], lng: SHOP_COORDS[1], fee: 0
  });

  const [loading, setLoading] = useState(false);
  const [isLocated, setIsLocated] = useState(location.state?.isLocated || false);
  const [userPos, setUserPos] = useState(location.state?.deliveryDetails ? [location.state.deliveryDetails.lat, location.state.deliveryDetails.lng] : SHOP_COORDS);
  const [mapCenter, setMapCenter] = useState(location.state?.deliveryDetails ? [location.state.deliveryDetails.lat, location.state.deliveryDetails.lng] : SHOP_COORDS);

  const addonPrices = { 'None': 0, 'Artisan Candles': 5, 'Gift Ribbon': 2 };

  // New function to remove add-on
  const removeAddon = (index) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], addOns: 'None' };
    // Assuming you have access to setItems from your CartProvider, 
    // if not, you may need to add it to your context export
    setItems(newItems);
  };

  const updateDeliveryField = (field, value) => {
    setDeliveryDetails(prev => ({ ...prev, [field]: value }));
    setIsLocated(false);
  };

  const handleCoordsChange = (lat, lng) => {
    setUserPos([lat, lng]);
    const dist = calculateDistance(SHOP_COORDS[0], SHOP_COORDS[1], lat, lng);
    const fee = getDeliveryFee(dist);
    setDeliveryDetails(prev => ({ ...prev, lat, lng, fee }));
    setIsLocated(true);
  };

  const handleLocate = async () => {
    setLoading(true);
    const fullAddress = `${deliveryDetails.address}, ${deliveryDetails.postcode} ${deliveryDetails.city}, ${deliveryDetails.state}`;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&countrycodes=my`);
      const data = await response.json();
      if (data && data.length > 0) {
        const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setMapCenter(coords);
        handleCoordsChange(coords[0], coords[1]);
      } else { alert('Address not found.'); }
    } catch (e) { alert('Error connecting to map service.'); } finally { setLoading(false); }
  };

  const handleProceed = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.email) { alert("Please fill in your contact details."); return; }
    if (deliveryType === 'DELIVERY' && !isLocated) { alert("Please click 'LOCATE ON MAP' to confirm your delivery address."); return; }
    navigate('/checkout-summary', { state: { deliveryDetails, total, deliveryType, customerInfo, isLocated } });
  };

  const subtotal = items.reduce((sum, item) => sum + ((item.price + (addonPrices[item.addOns] || 0)) * item.quantity), 0);
  const total = deliveryType === 'DELIVERY' ? subtotal + deliveryDetails.fee : subtotal;

  return (
    <div className="min-h-screen bg-[#fefdfa] text-[#4a3728]">
      <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-5px); } } .force-shake { animation: shake 0.4s ease-in-out infinite; }`}</style>
      <Navbar />
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <h2 className="mb-8 text-xl font-black uppercase tracking-widest text-[#4a3728]">Your Cookie Cart</h2>

        {/* CART ITEMS */}
        <div className="bg-white p-6 rounded-3xl border border-[#4a3728]/10 shadow-sm space-y-8 mb-12">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-[#4a3728]/10 last:border-0 last:pb-0">

              {/* Product Image */}
              <div className="w-20 h-20 rounded-2xl bg-[#f9f5f2] flex-shrink-0 overflow-hidden border border-[#4a3728]/10 self-start">
                <img src={PRODUCTS.find(p => p.id === item.product_id)?.image} alt={item.productName} className="w-full h-full object-cover" />
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                <h3 className="font-black uppercase tracking-tight">{item.productName}</h3>
                <p className="text-sm font-bold opacity-70">RM {item.price.toFixed(2)}</p>

                {item.addOns !== 'None' && (
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-[10px] font-bold uppercase bg-[#f5e1c8] px-2 py-0.5 rounded-full text-[#4a3728]">
                      + {item.addOns} (RM {addonPrices[item.addOns]?.toFixed(2)})
                    </p>
                    <button onClick={() => removeAddon(index)} className="text-[10px] font-black underline">Remove Addon</button>
                  </div>
                )}

                {item.giftNote && <p className="text-[10px] italic text-[#4a3728]/60 mt-1">"{item.giftNote}"</p>}
              </div>

              {/* Action/Price Area */}
              <div className="flex flex-col items-start sm:items-end gap-2">
                <span className="font-black">RM {((item.price + (addonPrices[item.addOns] || 0)) * item.quantity).toFixed(2)}</span>

                <div className="flex items-center gap-3 bg-[#f9f5f2] rounded-full px-3 py-1">
                  <button onClick={() => updateQuantity(index, -1)} className="font-black">-</button>
                  <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(index, 1)} className="font-black">+</button>
                </div>

                <div className="flex gap-4 sm:flex-col sm:gap-0">
                  <button
                    onClick={() => navigate(`/provisions/${item.product_id}`, { state: { editIndex: index } })}
                    className="text-[10px] font-black underline opacity-40 hover:opacity-100 uppercase tracking-widest mt-2"
                  >
                    Edit Item
                  </button>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-[10px] font-black opacity-40 hover:opacity-100 hover:text-red-500 transition-all uppercase tracking-widest mt-2"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT DETAILS */}
        <div className="space-y-4 mb-12">
          <h3 className="font-black uppercase tracking-widest mb-4">Contact Info</h3>
          <input type="text" value={customerInfo.name} placeholder="Full Name" className="w-full p-4 rounded-2xl bg-white border-2 border-[#4a3728]/20 focus:border-[#4a3728] outline-none" onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input type="tel" value={customerInfo.phone} placeholder="Phone" className="p-4 rounded-2xl bg-white border-2 border-[#4a3728]/20 focus:border-[#4a3728] outline-none" onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })} />
            <input type="email" value={customerInfo.email} placeholder="Email" className="p-4 rounded-2xl bg-white border-2 border-[#4a3728]/20 focus:border-[#4a3728] outline-none" onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })} />
          </div>
        </div>

        {/* DELIVERY OPTIONS */}
        <div className="mb-12">
          <h2 className="font-black uppercase tracking-widest mb-6">Delivery Choice</h2>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => { setDeliveryType('PICKUP'); updateDeliveryField('fee', 0); }}
              className={`flex-1 py-4 font-black uppercase rounded-full border-2 transition-all ${deliveryType === 'PICKUP' ? 'bg-[#4a3728] text-[#f5e1c8]' : 'border-[#4a3728]/20'}`}
            >
              Pickup
            </button>
            <button
              onClick={() => setDeliveryType('DELIVERY')}
              className={`flex-1 py-4 font-black uppercase rounded-full border-2 transition-all ${deliveryType === 'DELIVERY' ? 'bg-[#4a3728] text-[#f5e1c8]' : 'border-[#4a3728]/20'}`}
            >
              Delivery
            </button>
          </div>

          {/* PICKUP VIEW */}
          {deliveryType === 'PICKUP' && (
            <div className="bg-white p-6 rounded-3xl border border-[#4a3728]/10 shadow-sm animate-in fade-in duration-500">
<div className="w-full h-48 rounded-2xl overflow-hidden mb-4 border border-[#4a3728]/10 bg-[#f9f5f2] flex items-center justify-center">
  <img
    src={signboard}
    alt="Pickup Location"
    className="w-full h-full object-cover"
    loading="lazy" 
  />
</div>
              <h3 className="font-black text-lg uppercase">Collect at our Cafe</h3>
              <p className="text-sm font-medium opacity-70 mt-1 mb-4">
                Swing by our shop to collect your freshly baked cookies! We're ready for you.
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-[#4a3728]/10">
                <p className="font-black text-sm">Pickup Fee</p>
                <p className="font-black text-lg text-[#4a3728]">RM 0.00</p>
              </div>
            </div>
          )}

          {/* DELIVERY VIEW */}
          {deliveryType === 'DELIVERY' && (
            <div className="space-y-4 animate-in fade-in duration-500">
              {/* UPDATED DELIVERY RATE GUIDE */}
              <div className="bg-[#f9f5f2] p-4 rounded-2xl border border-[#4a3728]/10 text-[#4a3728]">
                <p className="text-xs font-black uppercase tracking-widest mb-2">Delivery Rates</p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold opacity-80">
                  <p>• 0-3 KM: RM 5.00</p>
                  <p>• 3-8 KM: RM 10.00</p>
                  <p>• 8-15 KM: RM 15.00</p>
                  <p>• 15+ KM: RM 20.00</p>
                </div>
              </div>

              <input type="text" value={deliveryDetails.address} placeholder="Address" className="w-full p-4 rounded-2xl border-2 border-[#4a3728]/20 focus:border-[#4a3728] outline-none" onChange={(e) => updateDeliveryField('address', e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" value={deliveryDetails.postcode} placeholder="Postcode" className="p-4 rounded-2xl border-2 border-[#4a3728]/20 focus:border-[#4a3728] outline-none" onChange={(e) => updateDeliveryField('postcode', e.target.value)} />
                <input type="text" value={deliveryDetails.city} placeholder="City" className="p-4 rounded-2xl border-2 border-[#4a3728]/20 focus:border-[#4a3728] outline-none" onChange={(e) => updateDeliveryField('city', e.target.value)} />
              </div>
              <input type="text" value={deliveryDetails.state} placeholder="State" className="w-full p-4 rounded-2xl border-2 border-[#4a3728]/20 focus:border-[#4a3728] outline-none" onChange={(e) => updateDeliveryField('state', e.target.value)} />

              <button onClick={handleLocate} className={`w-full bg-[#4a3728] text-[#f5e1c8] py-4 rounded-full font-black uppercase transition-all ${(!loading && deliveryDetails.address.length > 3 && !isLocated) ? 'force-shake' : ''}`}>
                {loading ? 'Searching...' : 'Locate on Map'}
              </button>

              <div className="h-64 w-full rounded-2xl overflow-hidden border-2 border-[#4a3728]/20">
                <MapContainer center={mapCenter} zoom={13} style={{ height: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <ChangeView center={mapCenter} />
                  <ShopMarker />
                  <LocationMarker onCoordsChange={handleCoordsChange} />
                  <Polyline positions={[SHOP_COORDS, userPos]} color="#4a3728" dashArray="5, 10" />
                  <Circle center={SHOP_COORDS} radius={calculateDistance(SHOP_COORDS[0], SHOP_COORDS[1], userPos[0], userPos[1]) * 1000} pathOptions={{ color: '#4a3728', fillColor: '#4a3728', fillOpacity: 0.1 }} />
                </MapContainer>
              </div>
              <p className="font-black text-right text-sm italic">Delivery Fee: RM {deliveryDetails.fee.toFixed(2)}</p>
            </div>
          )}




        </div>

        {/* FINAL TOTAL */}
        <div className="flex justify-between items-center py-6 border-t-2 border-dashed border-[#4a3728]/20">
          <span className="font-black text-lg">Total Amount</span>
          <span className="font-black text-3xl">RM {total.toFixed(2)}</span>
        </div>

        <button onClick={handleProceed} disabled={deliveryType === 'DELIVERY' && !isLocated} className="w-full py-5 rounded-full font-black uppercase tracking-widest bg-[#4a3728] text-[#f5e1c8] hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100">
          {deliveryType === 'DELIVERY' && !isLocated ? 'Locate Map First' : 'Checkout'}
        </button>
      </div>
    </div>
  );
};

export default Cart;