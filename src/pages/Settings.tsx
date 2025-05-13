import React, { useState } from 'react';
import { Bell, Database, Globe, Lock, Save, Settings as SettingIcon } from 'lucide-react';

const Settings: React.FC = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [webhookURL, setWebhookURL] = useState('');
  const [apiKey, setApiKey] = useState('sk_test_•••••••••••••••••••••••••');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure your Smart Stock Deals app preferences
        </p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex items-center px-4 py-4 border-b border-gray-200 sm:px-6">
          <Database className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Data Preferences</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex-grow flex flex-col">
                  <span className="text-sm font-medium text-gray-900">Auto-refresh data</span>
                  <span className="text-sm text-gray-500">
                    Automatically refresh product data every 24 hours
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`${
                    autoRefresh ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      autoRefresh ? 'translate-x-5' : 'translate-x-1'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum days since last sale
                </label>
                <div className="mt-1">
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="30"
                  >
                    <option value="15">15 days</option>
                    <option value="30">30 days</option>
                    <option value="45">45 days</option>
                    <option value="60">60 days</option>
                  </select>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Products with no sales for fewer days than this will not be considered stale
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Exclude products with tags (comma separated)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="seasonal,limited,exclusion"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Products with these tags will be excluded from automatic discounts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex items-center px-4 py-4 border-b border-gray-200 sm:px-6">
          <Bell className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex-grow flex flex-col">
                  <span className="text-sm font-medium text-gray-900">Email notifications</span>
                  <span className="text-sm text-gray-500">
                    Receive email updates about automated discounts and sales
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`${
                    emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      emailNotifications ? 'translate-x-5' : 'translate-x-1'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Webhook URL (optional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={webhookURL}
                    onChange={(e) => setWebhookURL(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="https://example.com/webhook"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Receive webhook notifications when discounts are applied or inventory status changes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex items-center px-4 py-4 border-b border-gray-200 sm:px-6">
          <Lock className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">API Integration</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Shopify API Key
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="block w-full pr-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="sk_test_..."
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex-grow flex flex-col">
                    <span className="text-sm font-medium text-gray-900">API Access</span>
                    <span className="text-sm text-gray-500">
                      Allow external systems to access the app via API
                    </span>
                  </span>
                  <button
                    type="button"
                    className="bg-indigo-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span
                      className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="button"
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;