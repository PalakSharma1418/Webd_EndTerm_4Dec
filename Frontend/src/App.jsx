import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrderTrackingPage from './pages/OrderTrackingPage';

// Simple Router Component
const AppRouter = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navigate = (page) => {
    setCurrentPage(page);
  };

  // Protected Route Handler
  const renderPage = () => {
    // Redirect to login if trying to access protected pages
    if (!isAuthenticated && ['profile', 'order-tracking'].includes(currentPage)) {
      return <LoginPage onNavigate={navigate} />;
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'register':
        return <RegisterPage onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} onCartOpen={() => setCartOpen(true)} />;
      case 'order-tracking':
        return <OrderTrackingPage onCartOpen={() => setCartOpen(true)} />;
      case 'home':
      default:
        return <HomePage onNavigate={navigate} cartOpen={cartOpen} setCartOpen={setCartOpen} />;
    }
  };

  return renderPage();
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;