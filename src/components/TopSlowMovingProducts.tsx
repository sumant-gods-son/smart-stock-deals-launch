import React from 'react';
import { Clock, Tag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  daysSinceLastSale: number;
  price: number;
  inventory: number;
  discount: string | null;
}

const TopSlowMovingProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Vintage Denim Jacket',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=100',
      daysSinceLastSale: 124,
      price: 89.99,
      inventory: 15,
      discount: '20%',
    },
    {
      id: '2',
      name: 'Leather Messenger Bag',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=100',
      daysSinceLastSale: 98,
      price: 129.99,
      inventory: 8,
      discount: '15%',
    },
    {
      id: '3',
      name: 'Premium Bluetooth Headphones',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100',
      daysSinceLastSale: 86,
      price: 199.99,
      inventory: 12,
      discount: null,
    },
    {
      id: '4',
      name: 'Ceramic Plant Pot',
      image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=100',
      daysSinceLastSale: 78,
      price: 34.99,
      inventory: 23,
      discount: '10%',
    },
  ];

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-12 h-12 object-cover rounded-md"
          />
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
              {product.discount ? (
                <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full flex items-center">
                  <Tag size={12} className="mr-1" />
                  {product.discount}
                </span>
              ) : (
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                  No discount
                </span>
              )}
            </div>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-amber-600">
                <Clock size={14} className="mr-1" />
                <span className="text-xs">{product.daysSinceLastSale} days</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-xs text-gray-500">${product.price.toFixed(2)}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-xs text-gray-500">{product.inventory} in stock</span>
            </div>
          </div>
          <button className="ml-4 px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors">
            View
          </button>
        </div>
      ))}
      <div className="pt-2">
        <button className="w-full py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors">
          View All Slow-Moving Products
        </button>
      </div>
    </div>
  );
};

export default TopSlowMovingProducts;