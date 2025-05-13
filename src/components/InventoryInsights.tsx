import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryInsights: React.FC = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Products',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const data = {
    labels: ['30+ Days', '60+ Days', '90+ Days', '120+ Days'],
    datasets: [
      {
        label: 'Products without sales',
        data: [65, 42, 28, 15],
        backgroundColor: [
          'rgba(79, 70, 229, 0.6)', // Indigo
          'rgba(245, 158, 11, 0.6)', // Amber
          'rgba(239, 68, 68, 0.6)',  // Red
          'rgba(220, 38, 38, 0.7)',  // Darker Red
        ],
        borderColor: [
          'rgb(79, 70, 229)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(220, 38, 38)',
        ],
        borderWidth: 1,
      },
      {
        label: 'With active discounts',
        data: [40, 28, 22, 12],
        backgroundColor: 'rgba(16, 185, 129, 0.6)', // Emerald
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="h-72">
        <Bar options={options} data={data} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-indigo-50 p-3 rounded-md">
          <p className="text-sm font-medium text-indigo-800">Insight</p>
          <p className="mt-1 text-xs text-indigo-600">
            42% of slow-moving inventory has active discounts. Consider adding discounts to the remaining items.
          </p>
        </div>
        <div className="bg-amber-50 p-3 rounded-md">
          <p className="text-sm font-medium text-amber-800">Recommendation</p>
          <p className="mt-1 text-xs text-amber-600">
            Products in the 90+ days group have the highest conversion after discount. Prioritize this group.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventoryInsights;