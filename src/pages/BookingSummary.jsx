import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useBooking } from '../context/BookingContext';

const BookingSummary = () => {
  const { packageName } = useParams();
  const navigate = useNavigate();
  const { bookingData, getTotalPrice } = useBooking();

  const handleBack = () => {
    navigate(-1);
  };

  const handleProceedToPayment = () => {
    // TODO: Integrate with payment gateway
    // For now, just log the booking data
    console.log('Booking Data:', bookingData);
    alert('Proceeding to payment... (Integration coming soon)');
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
          <span className="text-[#4a3728]/50">Customer Information</span>
          <span className="text-[#4a3728]/50">/</span>
          <span className="text-[#4a3728] font-black">Order Summary</span>
        </div>

        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[#d87a7a]/90 mb-2">Step 3 of 3</p>
          <h1 className="text-4xl md:text-5xl font-black uppercase">Order Summary</h1>
          <p className="text-sm md:text-base text-[#4a3728]/80 mt-4">
            Please review your booking details before proceeding to payment.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Package Summary */}
          <div className="rounded-[2rem] border border-[#4a3728]/10 bg-[#f9f5f2] p-6 shadow-sm">
            <div className="overflow-hidden rounded-2xl mb-6 bg-white border border-[#4a3728]/10">
              <img
                src={bookingData.image}
                alt={bookingData.packageName}
                className="w-full h-56 object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Package</p>
                <h2 className="text-2xl font-black">{bookingData.packageName}</h2>
              </div>
              <p className="text-sm leading-6 text-[#4a3728]/90">{bookingData.description}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="rounded-[2rem] border border-[#4a3728]/10 bg-[#f9f5f2] p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-[#d87a7a]/90 mb-6 font-black">
              Booking Details
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Number of Pax</p>
                <p className="text-xl font-black">{bookingData.pax}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Event Date</p>
                <p className="text-lg font-black">{bookingData.eventDate}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Time Slot</p>
                <p className="text-lg font-black">{bookingData.timeSlot}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Event Type</p>
                <p className="text-lg font-black">{bookingData.eventType}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Location</p>
                <p className="text-sm leading-5 font-black">{bookingData.eventLocation}</p>
              </div>

              {bookingData.dietaryRequirements && (
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">
                    Dietary Requirements
                  </p>
                  <p className="text-sm">{bookingData.dietaryRequirements}</p>
                </div>
              )}
            </div>
          </div>

          {/* Customer Details & Total */}
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[#4a3728]/10 bg-[#f9f5f2] p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.4em] text-[#d87a7a]/90 mb-6 font-black">
                Customer Information
              </p>

              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Name</p>
                  <p className="text-lg font-black">{bookingData.customerName}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Phone</p>
                  <p className="text-lg font-black">{bookingData.customerPhone}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Email</p>
                  <p className="text-sm font-black break-all">{bookingData.customerEmail}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-2">Address</p>
                  <p className="text-sm leading-5">{bookingData.customerAddress}</p>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="rounded-[2rem] border border-[#4a3728]/10 bg-[#fff6f0] p-6 shadow-sm space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#4a3728]/70 mb-4 font-black">
                  Price Breakdown
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Package:</span>
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
              </div>

              <div className="border-t border-[#4a3728]/10 pt-4 flex justify-between items-center">
                <span className="font-black uppercase text-sm">Total Amount</span>
                 <span className="text-4xl font-black text-[#d87a7a]">{getTotalPrice() !== null ? `RM ${getTotalPrice()}` : 'Contact us'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-12 max-w-2xl mx-auto">
          <button
            onClick={handleBack}
            className="flex-1 rounded-3xl border-2 border-[#4a3728] px-6 py-4 text-base font-black uppercase tracking-[0.1em] text-[#4a3728] transition hover:bg-[#4a3728] hover:text-white"
          >
            Back
          </button>
          <button
            onClick={handleProceedToPayment}
            className="flex-1 rounded-3xl bg-[#d87a7a] px-6 py-4 text-base font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#b35d64]"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingSummary;
