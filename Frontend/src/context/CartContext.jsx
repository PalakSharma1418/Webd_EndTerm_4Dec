import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.dishId === item.dishId && i.restaurantId === item.restaurantId
      );
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (restaurantId, dishId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(restaurantId, dishId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.restaurantId === restaurantId && item.dishId === dishId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (restaurantId, dishId) => {
    setCartItems(prev =>
      prev.filter(item => !(item.restaurantId === restaurantId && item.dishId === dishId))
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        getCartTotal,
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;