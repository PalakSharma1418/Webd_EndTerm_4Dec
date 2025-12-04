import React, { useState } from 'react';
import { SlidersHorizontal, Star, Clock, DollarSign, X } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    rating: 0,
    deliveryTime: 'all',
    priceRange: 'all',
    cuisine: 'all',
    offers: false
  });

  const cuisineOptions = ['All', 'Italian', 'American', 'Japanese', 'Indian', 'Chinese', 'Mexican'];
  const deliveryTimes = [
    { value: 'all', label: 'Any Time' },
    { value: '30', label: 'Under 30 min' },
    { value: '45', label: 'Under 45 min' }
  ];
  const priceRanges = [
    { value: 'all', label: 'Any Price' },
    { value: 'low', label: '₹ Budget Friendly' },
    { value: 'medium', label: '₹₹ Mid Range' },
    { value: 'high', label: '₹₹₹ Premium' }
  ];

  const handleApplyFilters = () => {
    onFilterChange?.(filters);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      rating: 0,
      deliveryTime: 'all',
      priceRange: 'all',
      cuisine: 'all',
      offers: false
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v && v !== 'all' && v !== 0 && v !== false).length;

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center space-x-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 transition font-medium text-gray-700"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Filter Sidebar */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Minimum Rating
                </label>
                <div className="flex space-x-2">
                  {[0, 3, 3.5, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ ...filters, rating })}
                      className={`flex-1 py-2 px-3 rounded-lg border-2 transition ${
                        filters.rating === rating
                          ? 'border-orange-500 bg-orange-50 text-orange-600'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      {rating === 0 ? (
                        <span className="text-sm font-medium">Any</span>
                      ) : (
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{rating}+</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Delivery Time
                </label>
                <div className="space-y-2">
                  {deliveryTimes.map((time) => (
                    <button
                      key={time.value}
                      onClick={() => setFilters({ ...filters, deliveryTime: time.value })}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${
                        filters.deliveryTime === time.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <span className={`font-medium ${
                        filters.deliveryTime === time.value ? 'text-orange-600' : 'text-gray-700'
                      }`}>
                        {time.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Price Range
                </label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setFilters({ ...filters, priceRange: range.value })}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${
                        filters.priceRange === range.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <span className={`font-medium ${
                        filters.priceRange === range.value ? 'text-orange-600' : 'text-gray-700'
                      }`}>
                        {range.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cuisine Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cuisine Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {cuisineOptions.map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => setFilters({ ...filters, cuisine: cuisine.toLowerCase() })}
                      className={`px-4 py-2 rounded-lg border-2 transition font-medium ${
                        filters.cuisine === cuisine.toLowerCase()
                          ? 'border-orange-500 bg-orange-500 text-white'
                          : 'border-gray-200 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Offers */}
              <div>
                <label className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-orange-300 transition">
                  <span className="font-medium text-gray-700">Show Offers Only</span>
                  <input
                    type="checkbox"
                    checked={filters.offers}
                    onChange={(e) => setFilters({ ...filters, offers: e.target.checked })}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                  />
                </label>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t p-6 space-y-3">
              <button
                onClick={handleApplyFilters}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition"
              >
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Reset All
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterBar;