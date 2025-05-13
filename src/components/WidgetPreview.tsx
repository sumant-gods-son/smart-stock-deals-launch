import React, { useState, useEffect } from 'react';
import { Tag, Clock } from 'lucide-react';

interface WidgetSettings {
  placement: 'home' | 'product' | 'cart' | 'thankyou';
  badgeText: string;
  showTimer: boolean;
  buttonText: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  cornerStyle: 'rounded' | 'sharp';
  animation: 'fade' | 'slide' | 'none';
  productCount: number;
  layout: 'horizontal' | 'grid';
  customCSS: string;
  buttons: {
    mode: 'both' | 'addToCart' | 'buyNow' | 'none';
    addToCartText: string;
    buyNowText: string;
  };
}

interface WidgetPreviewProps {
  settings: WidgetSettings;
}

const mockProducts = [
  {
    id: 1,
    name: 'Vintage Denim Jacket',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600',
    originalPrice: 99.99,
    discountedPrice: 79.99,
  },
  {
    id: 2,
    name: 'Leather Messenger Bag',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
    originalPrice: 149.99,
    discountedPrice: 119.99,
  },
  {
    id: 3,
    name: 'Premium Headphones',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
    originalPrice: 199.99,
    discountedPrice: 159.99,
  },
  {
    id: 4,
    name: 'Ceramic Plant Pot',
    image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=600',
    originalPrice: 39.99,
    discountedPrice: 29.99,
  },
  {
    id: 5,
    name: 'Minimalist Watch',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600',
    originalPrice: 129.99,
    discountedPrice: 99.99,
  },
  {
    id: 6,
    name: 'Cotton Throw Blanket',
    image: 'https://images.pexels.com/photos/6032280/pexels-photo-6032280.jpeg?auto=compress&cs=tinysrgb&w=600',
    originalPrice: 59.99,
    discountedPrice: 44.99,
  },
  {
    id: 7,
    name: 'Wireless Speaker',
    image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=600',
    originalPrice: 89.99,
    discountedPrice: 69.99,
  },
  {
    id: 8,
    name: 'Bamboo Cutting Board',
    image: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=600',
    originalPrice: 34.99,
    discountedPrice: 24.99,
  },
];

const WidgetPreview: React.FC<WidgetPreviewProps> = ({ settings }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 59, seconds: 59 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!settings.showTimer) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.showTimer]);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);
    return () => clearInterval(timer);
  }, [settings.animation, settings.placement]);

  const getPlacementBackground = () => {
    switch (settings.placement) {
      case 'home':
        return 'bg-gradient-to-b from-white to-gray-100 p-4';
      case 'product':
        return 'bg-white p-4';
      case 'cart':
        return 'bg-gray-50 p-4';
      case 'thankyou':
        return 'bg-white p-4';
      default:
        return 'bg-white p-4';
    }
  };

  const getBorderRadius = () => {
    return settings.cornerStyle === 'rounded' ? 'rounded-lg' : '';
  };

  const getAnimationClass = () => {
    if (!visible) return 'opacity-0';
    
    switch (settings.animation) {
      case 'fade':
        return 'opacity-100 transition-opacity duration-500';
      case 'slide':
        return 'opacity-100 translate-y-0 transition-all duration-500';
      default:
        return 'opacity-100';
    }
  };

  const getLayoutClass = () => {
    return settings.layout === 'horizontal' 
      ? 'flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory'
      : `grid grid-cols-2 md:grid-cols-${Math.min(4, settings.productCount)} gap-4`;
  };

  const renderButtons = () => {
    if (settings.buttons.mode === 'none') return null;

    return (
      <div className={`mt-3 ${settings.buttons.mode === 'both' ? 'grid grid-cols-2 gap-2' : ''}`}>
        {(settings.buttons.mode === 'both' || settings.buttons.mode === 'addToCart') && (
          <button 
            className="w-full py-2 text-xs font-medium text-white widget-button"
            style={{ backgroundColor: settings.primaryColor }}
          >
            {settings.buttons.addToCartText}
          </button>
        )}
        {(settings.buttons.mode === 'both' || settings.buttons.mode === 'buyNow') && (
          <button 
            className={`w-full py-2 text-xs font-medium widget-button ${
              settings.buttons.mode === 'both' 
                ? 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                : 'text-white'
            }`}
            style={settings.buttons.mode === 'buyNow' ? { backgroundColor: settings.primaryColor } : {}}
          >
            {settings.buttons.buyNowText}
          </button>
        )}
      </div>
    );
  };

  const displayedProducts = mockProducts.slice(0, settings.productCount);

  return (
    <div className={`border border-gray-200 ${getPlacementBackground()}`}>
      <style>{settings.customCSS}</style>
      
      <h3 className="text-sm font-medium text-gray-500 mb-3">
        Preview: {settings.placement === 'home' ? 'Homepage' 
          : settings.placement === 'product' ? 'Product Page' 
          : settings.placement === 'cart' ? 'Cart Page' 
          : 'Thank You Page'}
      </h3>
      
      <div className={getLayoutClass()}>
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className={`widget-product flex-none ${settings.layout === 'horizontal' ? 'w-72' : 'w-full'} ${getBorderRadius()} overflow-hidden shadow-md border border-gray-200 ${getAnimationClass()} ${settings.animation === 'slide' && !visible ? 'translate-y-4' : ''}`}
            style={{ backgroundColor: 'white' }}
          >
            <div className="relative">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover widget-image"
              />
              <div 
                className="absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white widget-badge"
                style={{ backgroundColor: settings.accentColor }}
              >
                <div className="flex items-center">
                  <Tag size={12} className="mr-1" />
                  {settings.badgeText}
                </div>
              </div>
              
              {settings.showTimer && (
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center widget-timer">
                  <Clock size={12} className="mr-1" />
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 widget-title">{product.name}</h3>
              
              <div className="mt-1 flex items-baseline">
                <span className="text-lg font-bold widget-price" style={{ color: settings.primaryColor }}>
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-sm line-through text-gray-500 widget-original-price">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
              
              {renderButtons()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetPreview;