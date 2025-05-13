import React from 'react';
import { BarChart3, ChevronDown, Download, TrendingUp } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track the performance of your automated discounts
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Last 30 Days
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-indigo-100">
              <TrendingUp size={20} className="text-indigo-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Revenue From Discounts</p>
              <p className="text-2xl font-semibold text-gray-900">$12,489</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    68% of target
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-100">
                <div 
                  style={{ width: "68%" }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-emerald-100">
              <Tag size={20} className="text-emerald-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Discount Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">24.8%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-emerald-600">
                    +5.2% from last period
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-100">
                <div 
                  style={{ width: "74%" }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-600"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-amber-100">
              <ShoppingCart size={20} className="text-amber-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Discounted Orders</p>
              <p className="text-2xl font-semibold text-gray-900">342</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-amber-600">
                    +12.3% from last period
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-amber-100">
                <div 
                  style={{ width: "82%" }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-600"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-red-100">
              <Package size={20} className="text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Inventory Reduction</p>
              <p className="text-2xl font-semibold text-gray-900">18.5%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-red-600">
                    -2.1% from last period
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-red-100">
                <div 
                  style={{ width: "45%" }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and detailed metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Discount Performance</h2>
          </div>
          <div className="p-4">
            <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded">
              <BarChart3 size={48} className="text-gray-300" />
              <p className="ml-3 text-sm text-gray-500">Performance chart will appear here</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Top Performing Discounts</h2>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount Group
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">90+ Days (20%)</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">127 orders</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">32.4%</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$4,289</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">60+ Days (15%)</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">98 orders</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">26.7%</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$3,754</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">120+ Days (30%)</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">79 orders</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">20.3%</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$2,876</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">30+ Days (10%)</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">38 orders</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">12.8%</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$1,570</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;