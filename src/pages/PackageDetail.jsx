import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useBooking } from '../context/BookingContext';
import wedding from '../assets/wedding.png';
import genderreveal from '../assets/genderreveal.png';
import sweetbasics from '../assets/sweetbasics.png';
import exquisitedessert from '../assets/exquisitedessert.png';

const packageOptions = [
  {
    name: 'Sweet Basic',
    description: 'Perfect for intimate celebrations.',
    image: sweetbasics,
    pricing: {
      '20-40': 399,
      '40-60': 420,
      '60-80': 500,
    },
  },
  {
    name: 'Wedding & Canapés',
    description: 'Elegant displays for your special day.',
    image: wedding,
    pricing: {
      '20-40': 450,
      '40-60': 550,
      '60-80': 600,
      '80-100': 650,
      '100-120': 700
    },
  },
  {
    name: 'Gender Reveal',
    description: 'Magic for your big reveal.',
    image: genderreveal,
    pricing: {
      '20-40': 350,
      '40-60': 450,
      '60-80': 500,
    },
  },
  {
    name: 'Exquisite Dessert Table',
    description: 'Premium sweets and savouries.',
    image: exquisitedessert,
    pricing: {
      '20-40': 700,
      '40-60': 750,
      '60-80': 800,
      '80-100': 900,
      '100-120': 1000,
    },
  },
];

// Pax tier labels for display
const paxTiers = [
  { value: '20-40', label: '20-40 pax' },
  { value: '40-60', label: '40-60 pax' },
  { value: '60-80', label: '60-80 pax' },
  { value: '80-100', label: '80-100 pax' },
  { value: '100-120', label: '100-120 pax' },
];

const PackageDetail = () => {
  const { packageName } = useParams();
  const navigate = useNavigate();
  const { bookingData, setPackageDetails } = useBooking();
  
  const decodedPackageName = packageName ? decodeURIComponent(packageName) : 'Sweet Basic';
  const selectedPackage = packageOptions.find((pkg) => pkg.name === decodedPackageName) || {
    name: decodedPackageName,
    basePrice: 399,
    description: 'Our curated dessert table package for your event.',
    image: sweetbasics,
    pricing: {},
  };

  const [pax, setPax] = useState('20-40');
  const [eventDate, setEventDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00-12:00');
  const [delivery, setDelivery] = useState(0);
  const [extraTable, setExtraTable] = useState(0);
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [activeTab, setActiveTab] = useState('About');
  const [errors, setErrors] = useState({});

  // Restore form values from context if returning to this package
  useEffect(() => {
    if (
      bookingData.packageName === selectedPackage.name &&
      bookingData.eventDate
    ) {
      setPax(bookingData.pax);
      setEventDate(bookingData.eventDate);
      setTimeSlot(bookingData.timeSlot);
      setDelivery(bookingData.delivery);
      setExtraTable(bookingData.extraTable);
      setEventLocation(bookingData.eventLocation);
      setEventType(bookingData.eventType);
      setDietaryRequirements(bookingData.dietaryRequirements);
    }
  }, [selectedPackage.name, bookingData]);

  const basePriceForTier = selectedPackage.pricing && selectedPackage.pricing[pax];
  const totalPrice = basePriceForTier ? basePriceForTier + delivery + extraTable : null;

  const tabs = ['About', 'Flavours', 'Delivery', 'Important'];

  const validateForm = () => {
    const newErrors = {};

    if (!eventDate) newErrors.eventDate = 'Event date is required';
    if (!eventLocation.trim()) newErrors.eventLocation = 'Event location is required';
    if (!eventType.trim()) newErrors.eventType = 'Event type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookNow = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Save to booking context
    setPackageDetails({
      packageName: selectedPackage.name,
      basePrice: basePriceForTier || 0,
      image: selectedPackage.image,
      description: selectedPackage.description,
      pax,
      eventDate,
      timeSlot,
      delivery,
      extraTable,
      eventLocation,
      eventType,
      dietaryRequirements,
      priceAvailable: Boolean(basePriceForTier),
    });

    // Navigate to booking form
    navigate(`/package/${encodeURIComponent(selectedPackage.name)}/booking`);
  };

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
                <p className="text-xs uppercase tracking-[0.4em] opacity-80 mb-3">Current Price</p>
                {basePriceForTier ? (
                  <>
                    <p className="text-3xl font-black text-[#d87a7a]">RM {basePriceForTier}</p>
                    <p className="text-xs text-[#4a3728]/70 mt-2">({pax} pax)</p>
                  </>
                ) : (
                  <p className="text-sm text-[#4a3728]/80">Contact us for pricing for this pax tier.</p>
                )}
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
                <select 
                  value={pax}
                  onChange={(e) => setPax(e.target.value)} 
                  className="w-full p-4 border-2 border-[#4a3728] rounded-3xl bg-white"
                >
                  {paxTiers
                    .filter((tier) => selectedPackage.pricing && Object.prototype.hasOwnProperty.call(selectedPackage.pricing, tier.value))
                    .map((tier) => {
                      const tierPrice = selectedPackage.pricing[tier.value];
                      return (
                        <option key={tier.value} value={tier.value}>
                          {tier.label} (RM {tierPrice})
                        </option>
                      );
                    })}
                </select>
              </div>

              <div>
                <label className="block font-black uppercase mb-2">Event Date</label>
                <input 
                  type="date" 
                  value={eventDate} 
                  onChange={(e) => setEventDate(e.target.value)} 
                  className={`w-full p-4 border-2 rounded-3xl bg-white ${errors.eventDate ? 'border-red-500' : 'border-[#4a3728]'}`}
                />
                {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
              </div>

              <div>
                <label className="block font-black uppercase mb-2">Time Slot</label>
                <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full p-4 border-2 border-[#4a3728] rounded-3xl bg-white">
                  <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                  <option value="12:00-14:00">12:00 PM - 02:00 PM</option>
                  <option value="14:00-16:00">02:00 PM - 04:00 PM</option>
                  <option value="16:00-18:00">04:00 PM - 06:00 PM</option>
                  <option value="18:00-20:00">06:00 PM - 08:00 PM</option>
                  <option value="20:00-22:00">08:00 PM - 10:00 PM</option>
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
                <div>
                  <input 
                    type="text" 
                    placeholder="Event Location" 
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className={`w-full p-4 border-2 rounded-3xl bg-white ${errors.eventLocation ? 'border-red-500' : 'border-[#4a3728]'}`} 
                  />
                  {errors.eventLocation && <p className="text-red-500 text-sm mt-1">{errors.eventLocation}</p>}
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Type of Event" 
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className={`w-full p-4 border-2 rounded-3xl bg-white ${errors.eventType ? 'border-red-500' : 'border-[#4a3728]'}`} 
                  />
                  {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
                </div>
                <textarea 
                  placeholder="Dietary Requirements" 
                  value={dietaryRequirements}
                  onChange={(e) => setDietaryRequirements(e.target.value)}
                  className="w-full p-4 border-2 border-[#4a3728] rounded-3xl bg-white min-h-[140px] resize-none" 
                />
              </div>

              <div className="rounded-3xl bg-[#fff6f0] p-6 text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-[#4a3728]/70 mb-3">Estimated total</p>
                <p className="text-3xl font-black text-[#d87a7a]">{totalPrice !== null ? `RM ${totalPrice}` : 'Contact us'}</p>
              </div>

              <button 
                onClick={handleBookNow}
                className="w-full rounded-3xl bg-[#d87a7a] px-6 py-4 text-base font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#b35d64]">
                Book Now / Register Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetail;