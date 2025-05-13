import React from 'react';
import { BarChart3, Clock, DollarSign, Package, Tag } from 'lucide-react';
import StatCard from '../components/StatCard';
import InventoryInsights from '../components/InventoryInsights';
import TopSlowMovingProducts from '../components/TopSlowMovingProducts';
import RecentDiscountActivity from '../components/RecentDiscountActivity';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your slow-moving inventory and discount performance
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Stale Products" 
          value="127" 
          change="+6%" 
          trend="up" 
          icon={<Package className="text-indigo-600" />} 
        />
        <StatCard 
          title="Avg. Days No Sale" 
          value="42" 
          change="-3%" 
          trend="down" 
          icon={<Clock className="text-amber-500" />} 
        />
        <StatCard 
          title="Active Discounts" 
          value="32" 
          change="+12%" 
          trend="up" 
          icon={<Tag className="text-emerald-500" />} 
        />
        <StatCard 
          title="Revenue Recovery" 
          value="$4,289" 
          change="+18%" 
          trend="up" 
          icon={<DollarSign className="text-indigo-600" />} 
        />
      </div>

      {/* Main dashboard content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Inventory Insights</h2>
          </div>
          <div className="p-4">
            <InventoryInsights />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Top Slow-Moving Products</h2>
          </div>
          <div className="p-4">
            <TopSlowMovingProducts />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Discount Activity</h2>
        </div>
        <div className="p-4">
          <RecentDiscountActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;