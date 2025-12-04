import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const DishCard = ({ dish, restaurantId, restaurantName }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      dishId: dish.id,
      restaurantId,
      restaurantName,
      name: dish.name,
      price: dish.price,
      image: dish.image
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={dish.image} 
          alt={dish.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h4 className="text-lg font-bold text-gray-800 mb-1">{dish.name}</h4>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{dish.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-500">₹{dish.price}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;