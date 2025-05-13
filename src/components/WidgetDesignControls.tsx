import React from 'react';
import { Brush, Circle, Columns, Layout, Square } from 'lucide-react';

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

interface WidgetDesignControlsProps {
  settings: WidgetSettings;
  onSettingChange: (key: keyof WidgetSettings, value: any) => void;
}

const ColorPicker: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div 
            className="w-full h-10 rounded border border-gray-300 cursor-pointer"
            style={{ backgroundColor: value }}
            onClick={() => document.getElementById(`color-${label}`)?.click()}
          />
          <input
            id={`color-${label}`}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
            title={label}
          />
        </div>
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => {
            const newValue = e.target.value;
            if (/^#[0-9A-F]{0,6}$/i.test(newValue)) {
              onChange(newValue);
            }
          }}
          className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          placeholder="#000000"
          maxLength={7}
        />
      </div>
    </div>
  );
};

const WidgetDesignControls: React.FC<WidgetDesignControlsProps> = ({ 
  settings,
  onSettingChange 
}) => {
  const handleButtonSettingChange = (key: keyof typeof settings.buttons, value: any) => {
    onSettingChange('buttons', { ...settings.buttons, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Layout className="inline-block h-4 w-4 mr-1 mb-1" />
          Layout Settings
        </label>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Number of Products
            </label>
            <select
              value={settings.productCount}
              onChange={(e) => onSettingChange('productCount', parseInt(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              {[2, 4, 6, 8].map((count) => (
                <option key={count} value={count}>{count} products</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Layout Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onSettingChange('layout', 'horizontal')}
                className={`flex items-center justify-center p-3 border ${
                  settings.layout === 'horizontal'
                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                } rounded-lg`}
              >
                <Columns size={18} className="mr-2" />
                <span className="text-sm font-medium">Horizontal</span>
              </button>
              <button
                onClick={() => onSettingChange('layout', 'grid')}
                className={`flex items-center justify-center p-3 border ${
                  settings.layout === 'grid'
                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                } rounded-lg`}
              >
                <Layout size={18} className="mr-2" />
                <span className="text-sm font-medium">Grid</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Brush className="inline-block h-4 w-4 mr-1 mb-1" />
          Color Scheme
        </label>
        <div className="space-y-4">
          <ColorPicker
            label="Primary Color"
            value={settings.primaryColor}
            onChange={(value) => onSettingChange('primaryColor', value)}
          />
          <ColorPicker
            label="Secondary Color"
            value={settings.secondaryColor}
            onChange={(value) => onSettingChange('secondaryColor', value)}
          />
          <ColorPicker
            label="Accent Color"
            value={settings.accentColor}
            onChange={(value) => onSettingChange('accentColor', value)}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Circle className="inline-block h-4 w-4 mr-1 mb-1" />
          Corner Style
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onSettingChange('cornerStyle', 'rounded')}
            className={`flex items-center justify-center p-3 border ${
              settings.cornerStyle === 'rounded'
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            } rounded-lg`}
          >
            <Circle size={18} className="mr-2" />
            <span className="text-sm font-medium">Rounded</span>
          </button>
          <button
            onClick={() => onSettingChange('cornerStyle', 'sharp')}
            className={`flex items-center justify-center p-3 border ${
              settings.cornerStyle === 'sharp'
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            } rounded-lg`}
          >
            <Square size={18} className="mr-2" />
            <span className="text-sm font-medium">Sharp</span>
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Square className="inline-block h-4 w-4 mr-1 mb-1" />
          Animation
        </label>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => onSettingChange('animation', 'none')}
            className={`flex items-center justify-center p-3 border ${
              settings.animation === 'none'
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            } rounded-lg`}
          >
            <span className="text-sm font-medium">None</span>
          </button>
          <button
            onClick={() => onSettingChange('animation', 'fade')}
            className={`flex items-center justify-center p-3 border ${
              settings.animation === 'fade'
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            } rounded-lg`}
          >
            <span className="text-sm font-medium">Fade</span>
          </button>
          <button
            onClick={() => onSettingChange('animation', 'slide')}
            className={`flex items-center justify-center p-3 border ${
              settings.animation === 'slide'
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            } rounded-lg`}
          >
            <span className="text-sm font-medium">Slide</span>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Button Options
        </label>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Display Mode
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={settings.buttons.mode}
                onChange={(e) => handleButtonSettingChange('mode', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="both">Show Both Buttons</option>
                <option value="addToCart">Add to Cart Only</option>
                <option value="buyNow">Buy Now Only</option>
                <option value="none">Hide Buttons</option>
              </select>
            </div>
          </div>

          {settings.buttons.mode !== 'none' && (
            <div className="space-y-3">
              {(settings.buttons.mode === 'both' || settings.buttons.mode === 'addToCart') && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    "Add to Cart" Text
                  </label>
                  <input
                    type="text"
                    value={settings.buttons.addToCartText}
                    onChange={(e) => handleButtonSettingChange('addToCartText', e.target.value)}
                    placeholder="Add to Cart"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              )}

              {(settings.buttons.mode === 'both' || settings.buttons.mode === 'buyNow') && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    "Buy Now" Text
                  </label>
                  <input
                    type="text"
                    value={settings.buttons.buyNowText}
                    onChange={(e) => handleButtonSettingChange('buyNowText', e.target.value)}
                    placeholder="Buy Now"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom CSS
        </label>
        <textarea
          value={settings.customCSS}
          onChange={(e) => onSettingChange('customCSS', e.target.value)}
          className="w-full h-32 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder=".widget-product { /* Custom styles */ }"
        />
        <p className="mt-1 text-xs text-gray-500">
          Add custom CSS to override default styles. Use class names like .widget-product, .widget-title, etc.
        </p>
      </div>
    </div>
  );
};

export default WidgetDesignControls;