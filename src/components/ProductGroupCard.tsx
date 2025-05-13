import React, { useState } from 'react';
import { ArrowRight, Clock, Package, Tag } from 'lucide-react';

interface ProductGroup {
  id: string;
  title: string;
  description: string;
  count: number;
  dayRange: string;
  discountValue: string | null;
  discountType: 'percentage' | 'fixed' | null;
  isAutomatic: boolean;
  timerEnabled: boolean;
  timerEndDate: string | null;
  badgeText: string;
  buttonText: string;
}

interface ProductGroupCardProps {
  group: ProductGroup;
  onDiscountChange: (id: string, value: string | null, type: 'percentage' | 'fixed' | null) => void;
  onAutomaticChange: (id: string, isAutomatic: boolean) => void;
  onTimerChange: (id: string, enabled: boolean, endDate: string | null) => void;
  onTextChange: (id: string, field: 'badgeText' | 'buttonText', value: string) => void;
}

const ProductGroupCard: React.FC<ProductGroupCardProps> = ({ 
  group, 
  onDiscountChange,
  onAutomaticChange,
  onTimerChange,
  onTextChange
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [discountValue, setDiscountValue] = useState(group.discountValue || '');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>(
    group.discountType || 'percentage'
  );
  const [timerEnabled, setTimerEnabled] = useState(group.timerEnabled);
  const [timerEndDate, setTimerEndDate] = useState(group.timerEndDate || '');
  const [badgeText, setBadgeText] = useState(group.badgeText);
  const [buttonText, setButtonText] = useState(group.buttonText);

  const handleSave = () => {
    onDiscountChange(group.id, discountValue || null, discountValue ? discountType : null);
    onTimerChange(group.id, timerEnabled, timerEnabled ? timerEndDate : null);
    onTextChange(group.id, 'badgeText', badgeText);
    onTextChange(group.id, 'buttonText', buttonText);
    setShowSettings(false);
  };

  const getGradientClass = () => {
    switch(group.id) {
      case '1': return 'from-indigo-100 to-indigo-50';
      case '2': return 'from-amber-100 to-amber-50';
      case '3': return 'from-rose-100 to-rose-50';
      case '4': return 'from-red-100 to-red-50';
      default: return 'from-gray-100 to-gray-50';
    }
  };

  const getTimeRemaining = () => {
    if (!group.timerEnabled || !group.timerEndDate) return null;
    
    const now = new Date();
    const end = new Date(group.timerEndDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return null;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div className={`rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02] duration-300 ${showSettings ? 'shadow-md bg-white' : 'bg-gradient-to-br ' + getGradientClass()}`}>
      {/* Header */}
      <div className="px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="rounded-full p-1.5 bg-white shadow-sm">
            <Clock size={18} className={`
              ${group.id === '1' ? 'text-indigo-500' : ''}
              ${group.id === '2' ? 'text-amber-500' : ''}
              ${group.id === '3' ? 'text-rose-500' : ''}
              ${group.id === '4' ? 'text-red-600' : ''}
            `} />
          </div>
          <h3 className="ml-2 text-sm font-semibold text-gray-900">{group.title}</h3>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
          {group.count} products
        </span>
      </div>

      {/* Content */}
      <div className="px-4 py-2">
        <p className="text-xs text-gray-600">{group.description}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Tag size={14} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-700">
              {group.discountValue 
                ? `${group.discountType === 'percentage' ? group.discountValue + '%' : '$' + group.discountValue} discount` 
                : 'No discount'}
            </span>
          </div>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              group.isAutomatic 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {group.isAutomatic ? 'Automatic' : 'Manual'}
            </span>
          </div>
        </div>

        {timeRemaining && (
          <div className="mt-2 flex items-center text-xs text-gray-600">
            <Clock size={12} className="mr-1" />
            <span>
              Ends in: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
            </span>
          </div>
        )}
      </div>

      {/* Settings panel */}
      {showSettings ? (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Discount Type
              </label>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1.5 text-xs font-medium rounded-md flex-1 ${
                    discountType === 'percentage'
                      ? 'bg-indigo-100 text-indigo-800 border-indigo-200 border'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setDiscountType('percentage')}
                >
                  Percentage (%)
                </button>
                <button
                  className={`px-3 py-1.5 text-xs font-medium rounded-md flex-1 ${
                    discountType === 'fixed'
                      ? 'bg-indigo-100 text-indigo-800 border-indigo-200 border'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setDiscountType('fixed')}
                >
                  Fixed Amount ($)
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Discount Value
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {discountType === 'fixed' ? '$' : ''}
                  </span>
                </div>
                <input
                  type="text"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className={`block w-full ${
                    discountType === 'fixed' ? 'pl-7' : 'pl-3'
                  } pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder={discountType === 'percentage' ? '10' : '5.99'}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {discountType === 'percentage' ? '%' : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-gray-700">
                  Countdown Timer
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setTimerEnabled(!timerEnabled);
                    if (!timerEnabled && !timerEndDate) {
                      // Set default end date to 24 hours from now
                      const date = new Date();
                      date.setHours(date.getHours() + 24);
                      setTimerEndDate(date.toISOString().slice(0, 16));
                    }
                  }}
                  className={`${
                    timerEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      timerEnabled ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>

              {timerEnabled && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      End Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={timerEndDate}
                      onChange={(e) => setTimerEndDate(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                      className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={badgeText}
                      onChange={(e) => setBadgeText(e.target.value)}
                      placeholder="Flash Sale"
                      className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      placeholder="Shop Now"
                      className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-700">
                  Apply Automatically
                </label>
                <button
                  type="button"
                  onClick={() => onAutomaticChange(group.id, !group.isAutomatic)}
                  className={`${
                    group.isAutomatic ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      group.isAutomatic ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                When enabled, discounts will be applied automatically to all products in this group.
              </p>
            </div>
            
            <div className="flex space-x-2 pt-1">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-3 py-1.5 text-xs font-medium border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex justify-between">
            <button
              onClick={() => setShowSettings(true)}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
            >
              Configure Discount
            </button>
            <a 
              href="#" 
              className="flex items-center text-xs font-medium text-gray-600 hover:text-gray-900"
            >
              View Products
              <ArrowRight size={12} className="ml-1" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGroupCard;