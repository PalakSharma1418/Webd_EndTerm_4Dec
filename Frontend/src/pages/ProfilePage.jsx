import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, Package, Heart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const ProfilePage = ({ onNavigate, onCartOpen }) => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  const stats = [
    { label: 'Total Orders', value: '24', icon: Package, color: 'bg-blue-500' },
    { label: 'Favorites', value: '12', icon: Heart, color: 'bg-red-500' },
    { label: 'Reviews', value: '18', icon: Edit2, color: 'bg-green-500' }
  ];

  const orderHistory = [
    { id: 1, restaurant: 'Pizza Paradise', items: '2 items', amount: 698, date: '2 days ago', status: 'Delivered' },
    { id: 2, restaurant: 'Burger Hub', items: '3 items', amount: 557, date: '5 days ago', status: 'Delivered' },
    { id: 3, restaurant: 'Sushi Station', items: '1 item', amount: 450, date: '1 week ago', status: 'Delivered' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCartOpen={onCartOpen} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative group">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
                <Camera className="w-5 h-5 text-orange-500" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              {!isEditing ? (
                <>
                  <h1 className="text-3xl font-bold text-white mb-2">{user?.name}</h1>
                  <p className="text-orange-100 mb-4">{user?.email}</p>
                  <p className="text-orange-100 mb-6">{user?.phone}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition inline-flex items-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </>
              ) : (
                <div className="space-y-3 max-w-md">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-white bg-white/20 text-white placeholder-orange-200 focus:outline-none focus:border-white"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-white bg-white/20 text-white placeholder-orange-200 focus:outline-none focus:border-white"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-white bg-white/20 text-white placeholder-orange-200 focus:outline-none focus:border-white"
                    placeholder="Phone"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition inline-flex items-center justify-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition inline-flex items-center justify-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{order.restaurant}</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{order.items}</span>
                      <span className="text-gray-400">•</span>
                      <span>{order.date}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-semibold text-orange-500">₹{order.amount}</span>
                    </div>
                    <button className="mt-3 text-sm text-orange-500 hover:text-orange-600 font-medium">
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-orange-500 hover:text-orange-600 font-semibold py-2 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition">
                View All Orders
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition text-left">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="font-medium text-gray-700">Manage Addresses</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition text-left">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Heart className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="font-medium text-gray-700">Favorite Restaurants</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition text-left">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Settings className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="font-medium text-gray-700">Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition text-left"
                >
                  <div className="bg-red-100 p-2 rounded-lg">
                    <LogOut className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="font-medium text-red-600">Logout</span>
                </button>
              </div>
            </div>

            {/* Wallet Card */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-2">FoodHub Wallet</h3>
              <p className="text-3xl font-bold mb-4">₹850</p>
              <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
                Add Money
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;