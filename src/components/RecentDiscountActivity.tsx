import React from 'react';
import { ArrowRight, Tag, Package, CheckCircle, AlertTriangle } from 'lucide-react';

interface DiscountActivity {
  id: string;
  timestamp: string;
  event: string;
  products: number;
  discountValue: string;
  status: 'success' | 'warning' | 'error';
}

const RecentDiscountActivity: React.FC = () => {
  const activities: DiscountActivity[] = [
    {
      id: '1',
      timestamp: '2h ago',
      event: 'Automatic discount applied',
      products: 12,
      discountValue: '15%',
      status: 'success',
    },
    {
      id: '2',
      timestamp: '8h ago',
      event: 'Discount applied manually',
      products: 5,
      discountValue: '$10 fixed',
      status: 'success',
    },
    {
      id: '3',
      timestamp: '1d ago',
      event: 'Discount rule triggered',
      products: 8,
      discountValue: '25%',
      status: 'warning',
    },
    {
      id: '4',
      timestamp: '2d ago',
      event: 'Discount schedule updated',
      products: 18,
      discountValue: '20%',
      status: 'success',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-emerald-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'error':
        return <AlertTriangle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Products
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Discount
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.map((activity) => (
            <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <Tag size={16} className="text-indigo-600 mr-2" />
                  <span className="text-sm text-gray-900">{activity.event}</span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <Package size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">{activity.products} items</span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {activity.discountValue}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  {getStatusIcon(activity.status)}
                  <span className="ml-1 text-sm text-gray-500">
                    {activity.status === 'success' ? 'Applied' : 'Warning'}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right">
                <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium flex items-center justify-end">
                  Details 
                  <ArrowRight size={14} className="ml-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentDiscountActivity;