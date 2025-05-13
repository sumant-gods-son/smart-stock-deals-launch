import React, { useState } from 'react';
import { 
  Check,
  Columns,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  ThumbsUp
} from 'lucide-react';
import WidgetPreview from '../components/WidgetPreview';
import WidgetDesignControls from '../components/WidgetDesignControls';

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

const WidgetCustomizer: React.FC = () => {
  const [settings, setSettings] = useState<WidgetSettings>({
    placement: 'home',
    badgeText: 'Flash Sale',
    showTimer: true,
    buttonText: 'Shop Now',
    primaryColor: '#4F46E5',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    cornerStyle: 'rounded',
    animation: 'fade',
    productCount: 4,
    layout: 'grid',
    customCSS: '',
    buttons: {
      mode: 'both',
      addToCartText: 'Add to Cart',
      buyNowText: 'Buy Now',
    },
  });

  const [activeTab, setActiveTab] = useState<'placement' | 'design'>('placement');

  const handleSettingChange = (key: keyof WidgetSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const placementOptions = [
    { id: 'home', name: 'Homepage', icon: <LayoutDashboard size={20} /> },
    { id: 'product', name: 'Product Page', icon: <ShoppingBag size={20} /> },
    { id: 'cart', name: 'Cart Page', icon: <ShoppingCart size={20} /> },
    { id: 'thankyou', name: 'Thank You Page', icon: <ThumbsUp size={20} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Widget Customizer</h1>
        <p className="mt-1 text-sm text-gray-500">
          Design and configure how discounted products are displayed on your store
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Preview */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Widget Preview</h2>
              <p className="mt-1 text-sm text-gray-500">
                See how your widget will appear on {settings.placement === 'home' ? 'the homepage' 
                  : settings.placement === 'product' ? 'product pages' 
                  : settings.placement === 'cart' ? 'the cart page' 
                  : 'the thank you page'}
              </p>
            </div>
            <div className="p-4">
              <WidgetPreview settings={settings} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-4 border-b border-gray-200">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('placement')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'placement'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Placement
                </button>
                <button
                  onClick={() => setActiveTab('design')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'design'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Design
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {activeTab === 'placement' ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Widget Placement
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {placementOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleSettingChange('placement', option.id)}
                          className={`flex items-center p-3 border ${
                            settings.placement === option.id
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                              : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                          } rounded-lg`}
                        >
                          <div className={`p-2 rounded-full mr-2 ${
                            settings.placement === option.id
                              ? 'bg-indigo-100'
                              : 'bg-gray-100'
                          }`}>
                            {option.icon}
                          </div>
                          <span className="text-sm font-medium">{option.name}</span>
                          {settings.placement === option.id && (
                            <Check size={16} className="ml-auto text-indigo-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Settings
                    </label>
                    <div className="space-y-4 bg-gray-50 p-4 rounded-md">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm text-gray-700">
                            Show Countdown Timer
                          </label>
                          <button
                            type="button"
                            onClick={() => handleSettingChange('showTimer', !settings.showTimer)}
                            className={`${
                              settings.showTimer ? 'bg-indigo-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                          >
                            <span
                              className={`${
                                settings.showTimer ? 'translate-x-5' : 'translate-x-1'
                              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Display a countdown timer to create urgency
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Badge Text
                        </label>
                        <input
                          type="text"
                          value={settings.badgeText}
                          onChange={(e) => handleSettingChange('badgeText', e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Flash Sale"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={settings.buttonText}
                          onChange={(e) => handleSettingChange('buttonText', e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Shop Now"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <WidgetDesignControls settings={settings} onSettingChange={handleSettingChange} />
              )}
              
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetCustomizer;