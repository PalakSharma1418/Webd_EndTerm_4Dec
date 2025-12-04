import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = {
        restaurantName: item.restaurantName,
        items: [],
        subtotal: 0
      };
    }
    acc[item.restaurantId].items.push(item);
    acc[item.restaurantId].subtotal += item.price * item.quantity;
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingCart className="w-16 h-16 mb-3" />
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedItems).map(([restaurantId, group]) => (
                <div key={restaurantId} className="border-b pb-4">
                  <h3 className="font-bold text-gray-800 mb-3">{group.restaurantName}</h3>
                  
                  {group.items.map(item => (
                    <div key={`${item.restaurantId}-${item.dishId}`} className="flex items-center space-x-3 mb-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-800">{item.name}</h4>
                        <p className="text-sm text-orange-500 font-semibold">₹{item.price}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.restaurantId, item.dishId, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.restaurantId, item.dishId, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.restaurantId, item.dishId)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{group.subtotal}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-orange-500">₹{getCartTotal()}</span>
            </div>
            <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;