import React, { useState, useEffect } from 'react';
import { Check, Package, Truck, Home, Phone, MapPin, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';

const OrderTrackingPage = ({ onCartOpen }) => {
  const [currentStep, setCurrentStep] = useState(2);

  const orderSteps = [
    { id: 1, label: 'Order Placed', icon: Check, time: '2:30 PM' },
    { id: 2, label: 'Preparing', icon: Package, time: '2:35 PM' },
    { id: 3, label: 'Out for Delivery', icon: Truck, time: 'Expected: 3:15 PM' },
    { id: 4, label: 'Delivered', icon: Home, time: '' }
  ];

  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const orderDetails = {
    orderId: 'ORD-2024-8756',
    restaurant: {
      name: 'Pizza Paradise',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
      address: '123 Food Street, Downtown'
    },
    items: [
      { name: 'Margherita Pizza', qty: 1, price: 299 },
      { name: 'Pepperoni Pizza', qty: 1, price: 399 }
    ],
    deliveryAddress: '456 Home Avenue, Apt 12B, Mathura',
    estimatedTime: '3:15 PM',
    driver: {
      name: 'Rahul Kumar',
      phone: '+91 98765 43210',
      rating: 4.8
    }
  };

  const totalAmount = orderDetails.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCartOpen={onCartOpen} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Order ID: {orderDetails.orderId}</p>
        </div>

        {/* Progress Timeline */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-1000"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {orderSteps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
                      currentStep >= step.id 
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg scale-110' 
                        : 'bg-gray-200'
                    }`}
                  >
                    <step.icon className={`w-7 h-7 ${currentStep >= step.id ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-sm font-semibold mb-1 text-center ${
                    currentStep >= step.id ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-500">{step.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Restaurant Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Restaurant Details</h2>
              <div className="flex items-center space-x-4">
                <img 
                  src={orderDetails.restaurant.image} 
                  alt={orderDetails.restaurant.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-800">{orderDetails.restaurant.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {orderDetails.restaurant.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="font-semibold text-orange-500">₹{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <p className="text-lg font-bold text-gray-800">Total Amount</p>
                <p className="text-2xl font-bold text-orange-500">₹{totalAmount}</p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h2>
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Home className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-1">Home</p>
                  <p className="text-gray-600">{orderDetails.deliveryAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Driver & ETA */}
          <div className="space-y-6">
            {/* Expected Time */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-8 h-8" />
              </div>
              <p className="text-center text-sm mb-2">Estimated Delivery</p>
              <p className="text-center text-3xl font-bold">{orderDetails.estimatedTime}</p>
              <p className="text-center text-sm mt-2 text-green-100">Your order is on the way!</p>
            </div>

            {/* Driver Details */}
            {currentStep >= 3 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Delivery Partner</h3>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                    {orderDetails.driver.name.charAt(0)}
                  </div>
                  <h4 className="font-bold text-gray-800">{orderDetails.driver.name}</h4>
                  <div className="flex items-center justify-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">{orderDetails.driver.rating}</span>
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Driver</span>
                </button>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                  <p className="font-medium text-gray-800">Contact Support</p>
                  <p className="text-sm text-gray-500">Get help with your order</p>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                  <p className="font-medium text-gray-800">Report an Issue</p>
                  <p className="text-sm text-gray-500">Something went wrong?</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;