import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('anismanis_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [deliveryType, setDeliveryType] = useState('DELIVERY');

  // Automatically save to localStorage whenever 'items' changes
  useEffect(() => {
    localStorage.setItem('anismanis_cart', JSON.stringify(items));
  }, [items]);

  // Added: New items are pushed to the array
  const addToCart = (product) => {
    setItems((prev) => [...prev, product]);
  };

  // Added: Update quantity for a specific item index
  const updateQuantity = (index, delta) => {
    setItems((prev) => 
      prev.map((item, i) => {
        if (i === index) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };


// Add this inside the CartProvider component
const updateItem = (index, updatedProduct) => {
  setItems((prev) => 
    prev.map((item, i) => (i === index ? updatedProduct : item))
  );
};

  return (
    <CartContext.Provider value={{ 
      items, 
      setItems, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      deliveryType, 
      updateItem,
      setDeliveryType 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);