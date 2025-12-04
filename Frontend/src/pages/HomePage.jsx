import React, { useState } from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import DishCard from '../components/DishCard';
import CartSidebar from '../components/CartSidebar';
import FilterBar from '../components/FilterBar';
import PromoBanner from '../components/PromoBanner';

// Mock Data
const mockRestaurants = [
  {
    id: 1,
    name: "Pizza Paradise",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "30-40 min",
    distance: "2.5 km",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    dishes: [
      { id: 101, name: "Margherita Pizza", price: 299, description: "Classic tomato and mozzarella", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop" },
      { id: 102, name: "Pepperoni Pizza", price: 399, description: "Loaded with pepperoni", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop" },
      { id: 103, name: "BBQ Chicken Pizza", price: 449, description: "Smoky BBQ sauce with chicken", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop" }
    ]
  },
  {
    id: 2,
    name: "Burger Hub",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "25-35 min",
    distance: "1.8 km",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
    dishes: [
      { id: 201, name: "Classic Burger", price: 199, description: "Beef patty with cheese", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop" },
      { id: 202, name: "Chicken Burger", price: 179, description: "Grilled chicken breast", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300&h=200&fit=crop" },
      { id: 203, name: "Veggie Burger", price: 159, description: "Plant-based patty", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=200&fit=crop" }
    ]
  },
  {
    id: 3,
    name: "Sushi Station",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: "40-50 min",
    distance: "3.2 km",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    dishes: [
      { id: 301, name: "California Roll", price: 450, description: "Crab, avocado, cucumber", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop" },
      { id: 302, name: "Salmon Nigiri", price: 380, description: "Fresh salmon on rice", image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=300&h=200&fit=crop" }
    ]
  },
  {
    id: 4,
    name: "Tandoor Nights",
    cuisine: "Indian",
    rating: 4.4,
    deliveryTime: "35-45 min",
    distance: "2.0 km",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    dishes: [
      { id: 401, name: "Butter Chicken", price: 320, description: "Creamy tomato curry", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop" },
      { id: 402, name: "Paneer Tikka", price: 280, description: "Grilled cottage cheese", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop" }
    ]
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.3,
    deliveryTime: "30-40 min",
    distance: "2.8 km",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    dishes: [
      { id: 501, name: "Beef Tacos", price: 250, description: "Spicy beef with salsa", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=200&fit=crop" },
      { id: 502, name: "Chicken Burrito", price: 290, description: "Loaded burrito bowl", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop" }
    ]
  },
  {
    id: 6,
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.6,
    deliveryTime: "35-45 min",
    distance: "3.0 km",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
    dishes: [
      { id: 601, name: "Hakka Noodles", price: 220, description: "Spicy stir-fried noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop" },
      { id: 602, name: "Manchurian", price: 240, description: "Crispy vegetable balls", image: "https://images.unsplash.com/photo-1563379091339-03b5c04fe2a5?w=300&h=200&fit=crop" }
    ]
  }
];

const HomePage = ({ onNavigate, cartOpen, setCartOpen }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filterCuisine, setFilterCuisine] = useState('All');
  const [activeFilters, setActiveFilters] = useState(null);

  const cuisines = ['All', ...new Set(mockRestaurants.map(r => r.cuisine))];
  
  let filteredRestaurants = filterCuisine === 'All' 
    ? mockRestaurants 
    : mockRestaurants.filter(r => r.cuisine === filterCuisine);

  // Apply advanced filters
  if (activeFilters) {
    filteredRestaurants = filteredRestaurants.filter(restaurant => {
      if (activeFilters.rating > 0 && restaurant.rating < activeFilters.rating) return false;
      if (activeFilters.cuisine !== 'all' && restaurant.cuisine.toLowerCase() !== activeFilters.cuisine) return false;
      return true;
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCartOpen={() => setCartOpen(true)} onNavigate={onNavigate} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedRestaurant ? (
          <>
            {/* Promo Banner */}
            <div className="mb-8">
              <PromoBanner />
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Order from your favorite restaurants</h1>
              <p className="text-gray-600">Browse menus and add items from multiple vendors</p>
            </div>

            {/* Filters Section */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <FilterBar onFilterChange={setActiveFilters} />
              
              {cuisines.map(cuisine => (
                <button
                  key={cuisine}
                  onClick={() => setFilterCuisine(cuisine)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filterCuisine === cuisine
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>

            {/* Restaurant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard 
                  key={restaurant.id} 
                  restaurant={restaurant}
                  onSelectRestaurant={setSelectedRestaurant}
                />
              ))}
            </div>

            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No restaurants found matching your filters.</p>
                <button 
                  onClick={() => {
                    setFilterCuisine('All');
                    setActiveFilters(null);
                  }}
                  className="mt-4 text-orange-500 hover:text-orange-600 font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <button 
              onClick={() => setSelectedRestaurant(null)}
              className="mb-6 text-orange-500 hover:text-orange-600 font-medium flex items-center space-x-2"
            >
              <span>← Back to Restaurants</span>
            </button>

            {/* Restaurant Details Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                <img 
                  src={selectedRestaurant.image} 
                  alt={selectedRestaurant.name}
                  className="w-full md:w-32 h-48 md:h-32 rounded-lg object-cover mb-4 md:mb-0"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedRestaurant.name}</h2>
                  <p className="text-gray-600 mb-3">{selectedRestaurant.cuisine} Cuisine</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1 bg-green-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-green-500 text-green-500" />
                      <span className="font-semibold text-green-700">{selectedRestaurant.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedRestaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedRestaurant.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-6">Popular Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedRestaurant.dishes.map(dish => (
                <DishCard 
                  key={dish.id} 
                  dish={dish}
                  restaurantId={selectedRestaurant.id}
                  restaurantName={selectedRestaurant.name}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default HomePage;