import React from 'react';
import { Clock, Package, Tag } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  compareAtPrice: number | null;
  daysSinceLastSale: number;
  inventory: number;
  selected?: boolean;
}

interface ProductListProps {
  products: Product[];
  onProductSelect: (productId: string, selected: boolean) => void;
  selectedProducts: Set<string>;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onProductSelect,
  selectedProducts 
}) => {
  return (
    <div className="space-y-2">
      {products.map((product) => (
        <div 
          key={product.id} 
          className={`flex items-center p-3 ${
            selectedProducts.has(product.id) ? 'bg-primary-50' : 'bg-white'
          } border border-gray-200 rounded-lg hover:bg-primary-50/50 transition-colors duration-200`}
        >
          <input
            type="checkbox"
            checked={selectedProducts.has(product.id)}
            onChange={(e) => onProductSelect(product.id, e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          
          <img 
            src={product.image} 
            alt={product.title} 
            className="ml-3 w-12 h-12 object-cover rounded-md"
          />
          
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
              {product.compareAtPrice && (
                <span className="px-2 py-1 text-xs font-medium bg-accent-100 text-accent-800 rounded-full flex items-center">
                  <Tag size={12} className="mr-1" />
                  {((1 - product.price / product.compareAtPrice) * 100).toFixed(0)}% off
                </span>
              )}
            </div>
            
            <div className="flex items-center mt-1">
              <div className="flex items-center text-amber-600">
                <Clock size={14} className="mr-1" />
                <span className="text-xs">{product.daysSinceLastSale} days</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-xs text-gray-500">
                ${product.price.toFixed(2)}
                {product.compareAtPrice && (
                  <span className="ml-1 text-gray-400 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-xs text-gray-500">{product.inventory} in stock</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;