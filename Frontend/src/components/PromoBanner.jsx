import React, { useState, useEffect } from 'react';
import { Tag, X, ArrowRight, Percent, Gift, Zap } from 'lucide-react';

const PromoBanner = () => {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const promos = [
    {
      id: 1,
      icon: Percent,
      title: '50% OFF',
      subtitle: 'On your first order',
      code: 'FIRST50',
      bgGradient: 'from-pink-500 to-rose-500',
      iconBg: 'bg-pink-600'
    },
    {
      id: 2,
      icon: Gift,
      title: 'Free Delivery',
      subtitle: 'On orders above ₹299',
      code: 'FREEDEL',
      bgGradient: 'from-purple-500 to-indigo-500',
      iconBg: 'bg-purple-600'
    },
    {
      id: 3,
      icon: Zap,
      title: 'Flash Deal',
      subtitle: 'Save ₹100 on premium restaurants',
      code: 'FLASH100',
      bgGradient: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-600'
    }
  ];

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, promos.length]);

  if (!isVisible) return null;

  const promo = promos[currentPromo];
  const PromoIcon = promo.icon;

  return (
    <div className="relative overflow-hidden">
      <div className={`bg-gradient-to-r ${promo.bgGradient} rounded-2xl shadow-lg p-6 transition-all duration-500`}>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`${promo.iconBg} p-4 rounded-xl shadow-lg`}>
              <PromoIcon className="w-8 h-8 text-white" />
            </div>
            
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-1">{promo.title}</h3>
              <p className="text-white/90 text-sm">{promo.subtitle}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white/80 text-xs mb-1">Use Code</p>
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-white/40">
                  <span className="text-white font-bold text-lg tracking-wider">{promo.code}</span>
                </div>
                <button className="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition flex items-center space-x-2">
                  <span>Apply</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Code Section */}
        <div className="md:hidden mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-white/40">
            <Tag className="w-4 h-4 text-white" />
            <span className="text-white font-bold tracking-wider">{promo.code}</span>
          </div>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition">
            Apply
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex space-x-2 mt-4">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPromo(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentPromo 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 w-6 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;