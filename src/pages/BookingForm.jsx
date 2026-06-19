import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useBooking } from '../context/BookingContext';

const BookingForm = () => {
  const { packageName } = useParams();
  const navigate = useNavigate();
  const { bookingData, setCustomerDetails, getTotalPrice } = useBooking();

  const [formData, setFormData] = useState({
    customerName: bookingData.customerName || '',
    customerPhone: bookingData.customerPhone || '',
    customerEmail: bookingData.customerEmail || '',
    customerAddress: bookingData.customerAddress || '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Phone number is required';
    if (!formData.customerEmail.trim()) newErrors.customerEmail = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) newErrors.customerEmail = 'Email is invalid';
    if (!formData.customerAddress.trim()) newErrors.customerAddress = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Save to booking context
    setCustomerDetails(formData);

    // Navigate to summary
    navigate(`/package/${encodeURIComponent(bookingData.packageName)}/summary`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="relative w-full min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm">
          <button onClick={handleBack} className="text-[#d87a7a] hover:underline">
            ← Back
          </button>
          <span className="text-[#4a3728]/50">Package Details</span>
          <span className="text-[#4a3728]/50">/</span>
          <span className="text-[#4a3728] font-black">Customer Information</span>
        </div>

        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[#d87a7a]/90 mb-2">Step 2 of 3</p>
          <h1 className="text-4xl md:text-5xl font-black uppercase">Customer Information</h1>
          <p className="text-sm md:text-base text-[#4a3728]/80 mt-4">
            Please provide your details so we can process your booking.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-black uppercase mb-2 text-sm">Full Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full p-4 border-2 rounded-3xl bg-white ${
                  errors.customerName ? 'border-red-500' : 'border-[#4a3728]'
                }`}
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
              )}
            </div>

            <div>
              <label className="block font-black uppercase mb-2 text-sm">Phone Number *</label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="e.g., +6012-3456789"
                className={`w-full p-4 border-2 rounded-3xl bg-white ${
                  errors.customerPhone ? 'border-red-500' : 'border-[#4a3728]'
                }`}
              />
              {errors.customerPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
              )}
            </div>

            <div>
              <label className="block font-black uppercase mb-2 text-sm">Email Address *</label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`w-full p-4 border-2 rounded-3xl bg-white ${
                  errors.customerEmail ? 'border-red-500' : 'border-[#4a3728]'
                }`}
              />
              {errors.customerEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
              )}
            </div>

            <div>
              <label className="block font-black uppercase mb-2 text-sm">Delivery Address *</label>
              <textarea
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange}
                placeholder="Street address, city, postal code"
                rows="5"
                className={`w-full p-4 border-2 rounded-3xl bg-white resize-none ${
                  errors.customerAddress ? 'border-red-500' : 'border-[#4a3728]'
                }`}
              />
              {errors.customerAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.customerAddress}</p>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 rounded-3xl border-2 border-[#4a3728] px-6 py-4 text-base font-black uppercase tracking-[0.1em] text-[#4a3728] transition hover:bg-[#4a3728] hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 rounded-3xl bg-[#d87a7a] px-6 py-4 text-base font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#b35d64]"
              >
                Review Order
              </button>
            </div>
          </form>

          {/* Booking Summary Card */}
          <div className="rounded-[2rem] border border-[#4a3728]/10 bg-[#f9f5f2] p-6 shadow-sm h-fit sticky top-32">
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Package</p>
                  <p className="text-lg font-black">{bookingData.packageName}</p>
                </div>

                <div className="border-t border-[#4a3728]/10 pt-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-3">Booking Details</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Number of Pax:</span>
                      <span className="font-black">{bookingData.pax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Event Date:</span>
                      <span className="font-black">{bookingData.eventDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Slot:</span>
                      <span className="font-black">{bookingData.timeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-black text-right max-w-[150px]">{bookingData.eventLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#4a3728]/10 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Package Price:</span>
                    <span className="font-black">{bookingData.priceAvailable ? `RM ${bookingData.basePrice}` : 'Contact us'}</span>
                  </div>
                  {bookingData.delivery > 0 && (
                    <div className="flex justify-between">
                      <span>Delivery & Setup:</span>
                      <span className="font-black">RM {bookingData.delivery}</span>
                    </div>
                  )}
                  {bookingData.extraTable > 0 && (
                    <div className="flex justify-between">
                      <span>Extra Table:</span>
                      <span className="font-black">RM {bookingData.extraTable}</span>
                    </div>
                  )}
                </div>

                <div className="rounded-3xl bg-[#fff6f0] p-4 text-center border-t border-[#4a3728]/10 pt-4">
                  <p className="text-sm uppercase tracking-[0.4em] text-[#4a3728]/70 mb-3">Estimated total</p>
                  <p className="text-3xl font-black text-[#d87a7a]">{getTotalPrice() !== null ? `RM ${getTotalPrice()}` : 'Contact us'}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
