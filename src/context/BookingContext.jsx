import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    // Package details
    packageName: '',
    basePrice: 0,
    image: '',
    description: '',
    
    // Package options
    pax: '20-40',
    eventDate: '',
    timeSlot: '10:00-12:00',
    delivery: 0,
    extraTable: 0,
    eventLocation: '',
    eventType: '',
    dietaryRequirements: '',
    
    // Customer info
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    // price availability flag
    priceAvailable: false,
  });

  const setPackageDetails = (packageInfo) => {
    setBookingData((prev) => ({
      ...prev,
      ...packageInfo,
    }));
  };

  const setCustomerDetails = (customerInfo) => {
    setBookingData((prev) => ({
      ...prev,
      ...customerInfo,
    }));
  };

  const getTotalPrice = () => {
    if (!bookingData.priceAvailable) return null;
    return bookingData.basePrice + bookingData.delivery + bookingData.extraTable;
  };

  const resetBooking = () => {
    setBookingData({
      packageName: '',
      basePrice: 0,
      image: '',
      description: '',
      pax: '20-40',
      eventDate: '',
      timeSlot: '10:00-12:00',
      delivery: 0,
      extraTable: 0,
      eventLocation: '',
      eventType: '',
      dietaryRequirements: '',
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: '',
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setPackageDetails,
        setCustomerDetails,
        getTotalPrice,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
