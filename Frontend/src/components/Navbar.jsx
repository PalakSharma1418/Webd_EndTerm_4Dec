import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, LogOut, Package, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onCartOpen, onNavigate }) => {
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    onNavigate?.('login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => onNavigate?.('home')}
              className="flex items-center space-x-3 hover:opacity-80 transition group"
            >
              {/* New Restaurant Plate Logo */}
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full group-hover:scale-110 transition-transform"></div>
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-8 h-8">
                    {/* Plate Circle */}
                    <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="4"/>
                    {/* Fork */}
                    <line x1="35" y1="30" x2="35" y2="50" stroke="white" strokeWidth="3"/>
                    <line x1="32" y1="30" x2="32" y2="40" stroke="white" strokeWidth="2"/>
                    <line x1="38" y1="30" x2="38" y2="40" stroke="white" strokeWidth="2"/>
                    {/* Spoon */}
                    <ellipse cx="65" cy="35" rx="4" ry="6" fill="white"/>
                    <line x1="65" y1="41" x2="65" y2="50" stroke="white" strokeWidth="3"/>
                    {/* Knife */}
                    <line x1="50" y1="65" x2="50" y2="85" stroke="white" strokeWidth="3"/>
                    <path d="M 47 65 L 50 60 L 53 65" fill="white"/>
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                FoodHub
              </span>
            </button>
            
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search restaurants or dishes..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => onNavigate?.('order-tracking')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition px-3 py-2 rounded-lg hover:bg-orange-50"
                >
                  <Package className="w-5 h-5" />
                  <span className="text-sm font-medium">Orders</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full border-2 border-orange-200"
                    />
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  </button>

                  {userMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-20 border">
                        <button
                          onClick={() => {
                            onNavigate?.('profile');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center space-x-3"
                        >
                          <User className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">My Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            onNavigate?.('order-tracking');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center space-x-3"
                        >
                          <Package className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">My Orders</span>
                        </button>
                        <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center space-x-3">
                          <Heart className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Favorites</span>
                        </button>
                        <div className="border-t my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 hover:bg-red-50 transition flex items-center space-x-3"
                        >
                          <LogOut className="w-5 h-5 text-red-600" />
                          <span className="text-red-600 font-medium">Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <button 
                onClick={() => onNavigate?.('login')}
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition px-4 py-2 border-2 border-orange-500 rounded-lg hover:bg-orange-50"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Login</span>
              </button>
            )}
            
            <button 
              onClick={onCartOpen}
              className="relative flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-rose-600 transition shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => {
                    onNavigate?.('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  My Profile
                </button>
                <button 
                  onClick={() => {
                    onNavigate?.('order-tracking');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  My Orders
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => {
                  onNavigate?.('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Login
              </button>
            )}
            <button 
              onClick={() => {
                onCartOpen();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-2 rounded-lg"
            >
              Cart ({totalItems})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;