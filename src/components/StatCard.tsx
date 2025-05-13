import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow transition-transform hover:scale-[1.02] duration-300">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="rounded-full p-2 bg-gray-50">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        {trend === 'up' && (
          <div className="flex items-center text-emerald-500">
            <ArrowUp size={16} className="mr-1" />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
        {trend === 'down' && (
          <div className="flex items-center text-red-500">
            <ArrowDown size={16} className="mr-1" />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
        <span className="text-xs text-gray-400 ml-1">vs last period</span>
      </div>
    </div>
  );
};

export default StatCard;