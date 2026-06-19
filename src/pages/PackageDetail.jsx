import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import wedding from '../assets/wedding.png';
import genderreveal from '../assets/genderreveal.png';
import sweetbasics from '../assets/sweetbasics.png';
import exquisitedessert from '../assets/exquisitedessert.png';

const packageOptions = [
  { name: 'Sweet Basic', basePrice: 399, description: 'Perfect for intimate celebrations.', image: sweetbasics },
  { name: 'Wedding & Canapés', basePrice: 400, description: 'Elegant displays for your special day.', image: wedding },
  { name: 'Gender Reveal', basePrice: 350, description: 'Magic for your big reveal.', image: genderreveal },
  { name: 'Exquisite Dessert Table', basePrice: 700, description: 'Premium sweets and savouries.', image: exquisitedessert },
];

const PackageDetail = () => {
  const { packageName } = useParams();
  const decodedPackageName = packageName ? decodeURIComponent(packageName) : 'Sweet Basic';
  const selectedPackage = packageOptions.find((pkg) => pkg.name === decodedPackageName) || {
    name: decodedPackageName,
    basePrice: 399,
    description: 'Our curated dessert table package for your event.',
  };

  const [pax, setPax] = useState('20-40');
  const [delivery, setDelivery] = useState(0); // 0 or 300
  const [extraTable, setExtraTable] = useState(0); // 0 or 150
  const [activeTab, setActiveTab] = useState('About');

  const totalPrice = selectedPackage.basePrice + delivery + extraTable;

  const tabs = ['About', 'Flavours', 'Delivery', 'Important'];

  return (
    <section className="relative w-full min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="space-y-4 mb-12 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-[#d87a7a]/90">Dessert Package</p>
          <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight">{selectedPackage.name}</h1>
          <p className="mx-auto max-w-3xl text-sm md:text-base leading-7 text-[#4a3728]/80 sm:mx-0">
            {selectedPackage.description}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] border border-[#4a3728]/10 bg-[#f9f5f2] shadow-sm">
              <img
                src={selectedPackage.image}
                alt={selectedPackage.name}
                className="w-full h-80 md:h-[420px] object-cover"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-[#4a3728]/10 bg-[#fff6f0] p-6">
                <p className="text-xs uppercase tracking-[0.4em] opacity-80 mb-3">Starting Price</p>
                <p className="text-3xl font-black text-[#d87a7a]">RM {selectedPackage.basePrice}</p>
              </div>
              <div className="rounded-3xl border border-[#4a3728]/10 bg-[#fff6f0] p-6">
                <p className="text-xs uppercase tracking-[0.4em] opacity-80 mb-3">Perfect For</p>
                <p className="text-sm leading-6 text-[#4a3728]/90">{selectedPackage.description}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#4a3728]/10 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap gap-2 border-b border-[#4a3728]/10 pb-4 mb-4">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-2 text-sm font-black uppercase transition ${activeTab === tab ? 'bg-[#d87a7a] text-white' : 'bg-[#f9f5f2] text-[#4a3728]/70'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[220px] leading-relaxed text-sm text-[#4a3728]/90">
                {activeTab === 'About' && <p>Our package offers a beautifully styled dessert table with a thoughtful selection of treats to fit your occasion.</p>}
                {activeTab === 'Flavours' && <p>Flavours are chosen to match your theme. Tell us your preferences and we’ll design a sweet menu just for you.</p>}
                {activeTab === 'Delivery' && <p>Delivery and setup are available across Klang Valley, with optional professional styling by our team.</p>}
                {activeTab === 'Important' && <p>Please note availability is subject to event date and inventory; book early to secure your preferred package.</p>}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#4a3728]/10 bg-[#f9f5f2] p-6 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block font-black uppercase mb-2">Number of Pax</label>
                <select onChange={(e) => setPax(e.target.value)} className="w-full p-4 border-2 border-[#4a3728] rounded-3xl bg-white">
                  <option>20-40 pax</option>
                  <option>40-60 pax</option>
                </select>
              </div>

              <div>
                <label className="block font-black uppercase mb-2">Delivery & Setup</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3"><input type="radio" name="del" className="h-4 w-4" onChange={() => setDelivery(300)} /> <span>Yes (+RM 300)</span></label>
                  <label className="flex items-center gap-3"><input type="radio" name="del" className="h-4 w-4" onChange={() => setDelivery(0)} /> <span>No (RM 0)</span></label>
                </div>
              </div>

              <div>
                <label className="block font-black uppercase mb-2">Extra Table</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3"><input type="radio" name="tbl" className="h-4 w-4" onChange={() => setExtraTable(150)} /> <span>Yes (+RM 150)</span></label>
                  <label className="flex items-center gap-3"><input type="radio" name="tbl" className="h-4 w-4" onChange={() => setExtraTable(0)} /> <span>No (RM 0)</span></label>
                </div>
              </div>

              <div className="space-y-4">
                <input type="text" placeholder="Event Location" className="w-full p-4 border-2 border-[#4a3728] rounded-3xl bg-white" />
                <input type="text" placeholder="Type of Event" className="w-full p-4 border-2 border-[#4a3728] rounded-3xl bg-white" />
                <textarea placeholder="Dietary Requirements" className="w-full p-4 border-2 border-[#4a3728] rounded-3xl bg-white min-h-[140px] resize-none" />
              </div>

              <div className="rounded-3xl bg-[#fff6f0] p-6 text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-[#4a3728]/70 mb-3">Estimated total</p>
                <p className="text-3xl font-black text-[#d87a7a]">RM {totalPrice}</p>
              </div>

              <button className="w-full rounded-3xl bg-[#d87a7a] px-6 py-4 text-base font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#b35d64]">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetail;