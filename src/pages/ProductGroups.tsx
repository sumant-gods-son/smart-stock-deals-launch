import React, { useState } from 'react';
import { Filter, Search, Sliders, Tag } from 'lucide-react';
import ProductGroupCard from '../components/ProductGroupCard';
import ProductList from '../components/ProductList';

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  compareAtPrice: number | null;
  daysSinceLastSale: number;
  inventory: number;
}

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
  products: Product[];
}

const ProductGroups: React.FC = () => {
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([
    {
      id: '1',
      title: '30+ Days No Sale',
      description: 'Products with no sales in the last 30-59 days',
      count: 65,
      dayRange: '30-59',
      discountValue: '10',
      discountType: 'percentage',
      isAutomatic: false,
      timerEnabled: false,
      timerEndDate: null,
      badgeText: 'Limited Time',
      buttonText: 'Shop Now',
      products: [
        {
          id: '1-1',
          title: 'Vintage Denim Jacket',
          image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=100',
          price: 89.99,
          compareAtPrice: null,
          daysSinceLastSale: 45,
          inventory: 15,
        },
        {
          id: '1-2',
          title: 'Leather Messenger Bag',
          image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=100',
          price: 129.99,
          compareAtPrice: null,
          daysSinceLastSale: 38,
          inventory: 8,
        },
      ],
    },
    {
      id: '2',
      title: '60+ Days No Sale',
      description: 'Products with no sales in the last 60-89 days',
      count: 42,
      dayRange: '60-89',
      discountValue: '15',
      discountType: 'percentage',
      isAutomatic: true,
      timerEnabled: true,
      timerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      badgeText: 'Flash Sale',
      buttonText: 'Get Deal',
      products: [
        {
          id: '2-1',
          title: 'Premium Headphones',
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100',
          price: 169.99,
          compareAtPrice: 199.99,
          daysSinceLastSale: 75,
          inventory: 12,
        },
        {
          id: '2-2',
          title: 'Ceramic Plant Pot',
          image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=100',
          price: 29.99,
          compareAtPrice: 34.99,
          daysSinceLastSale: 68,
          inventory: 23,
        },
      ],
    },
    {
      id: '3',
      title: '90+ Days No Sale',
      description: 'Products with no sales in the last 90-119 days',
      count: 28,
      dayRange: '90-119',
      discountValue: '20',
      discountType: 'percentage',
      isAutomatic: true,
      timerEnabled: false,
      timerEndDate: null,
      badgeText: 'Special Offer',
      buttonText: 'Buy Now',
      products: [
        {
          id: '3-1',
          title: 'Minimalist Watch',
          image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=100',
          price: 99.99,
          compareAtPrice: 129.99,
          daysSinceLastSale: 98,
          inventory: 6,
        },
      ],
    },
    {
      id: '4',
      title: '120+ Days No Sale',
      description: 'Products with no sales in 120 days or more',
      count: 15,
      dayRange: '120+',
      discountValue: '30',
      discountType: 'percentage',
      isAutomatic: true,
      timerEnabled: true,
      timerEndDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      badgeText: 'Clearance',
      buttonText: 'Save Now',
      products: [
        {
          id: '4-1',
          title: 'Wireless Speaker',
          image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=100',
          price: 69.99,
          compareAtPrice: 89.99,
          daysSinceLastSale: 145,
          inventory: 4,
        },
      ],
    },
  ]);

  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

  const handleDiscountChange = (id: string, value: string | null, type: 'percentage' | 'fixed' | null) => {
    setProductGroups((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, discountValue: value, discountType: type } : group
      )
    );
  };

  const handleAutomaticChange = (id: string, isAutomatic: boolean) => {
    setProductGroups((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, isAutomatic } : group
      )
    );
  };

  const handleTimerChange = (id: string, enabled: boolean, endDate: string | null) => {
    setProductGroups((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, timerEnabled: enabled, timerEndDate: endDate } : group
      )
    );
  };

  const handleTextChange = (id: string, field: 'badgeText' | 'buttonText', value: string) => {
    setProductGroups((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, [field]: value } : group
      )
    );
  };

  const handleProductSelect = (productId: string, selected: boolean) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (selected) {
        next.add(productId);
      } else {
        next.delete(productId);
      }
      return next;
    });
  };

  const handleApplyDiscount = async (groupId: string) => {
    const group = productGroups.find((g) => g.id === groupId);
    if (!group || !group.discountValue) return;

    setIsApplyingDiscount(true);

    try {
      // Here we would make the API call to Shopify Admin API
      // For each selected product in the group:
      // 1. Calculate the new price based on discount type and value
      // 2. Update the product variant with new price and compare_at_price
      
      const selectedGroupProducts = group.products.filter(
        (product) => selectedProducts.has(product.id)
      );

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state to reflect changes
      setProductGroups((prev) =>
        prev.map((g) => {
          if (g.id !== groupId) return g;

          return {
            ...g,
            products: g.products.map((product) => {
              if (!selectedProducts.has(product.id)) return product;

              const compareAtPrice = product.compareAtPrice || product.price;
              const discountMultiplier = group.discountType === 'percentage' 
                ? (100 - parseFloat(group.discountValue)) / 100
                : 1;
              const newPrice = group.discountType === 'percentage'
                ? compareAtPrice * discountMultiplier
                : compareAtPrice - parseFloat(group.discountValue);

              return {
                ...product,
                price: newPrice,
                compareAtPrice,
              };
            }),
          };
        })
      );

      // Clear selected products for this group
      setSelectedProducts((prev) => {
        const next = new Set(prev);
        selectedGroupProducts.forEach((product) => next.delete(product.id));
        return next;
      });

      alert(`Successfully applied discount to ${selectedGroupProducts.length} products`);
    } catch (error) {
      console.error('Error applying discount:', error);
      alert('Failed to apply discount. Please try again.');
    } finally {
      setIsApplyingDiscount(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Product Groups</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage automatic discounts for products based on days since last sale
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Filter size={18} className="mr-2" />
            Filters
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Sliders size={18} className="mr-2" />
            Sort
          </button>
        </div>
      </div>

      {/* Product Groups */}
      <div className="space-y-6">
        {productGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <ProductGroupCard
              group={group}
              onDiscountChange={handleDiscountChange}
              onAutomaticChange={handleAutomaticChange}
              onTimerChange={handleTimerChange}
              onTextChange={handleTextChange}
            />
            
            {!group.isAutomatic && (
              <div className="border-t border-gray-200">
                <div className="p-4">
                  <button
                    onClick={() => setExpandedGroup(
                      expandedGroup === group.id ? null : group.id
                    )}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    {expandedGroup === group.id ? 'Hide Products' : 'Select Products'}
                  </button>
                  
                  {expandedGroup === group.id && (
                    <div className="mt-4 space-y-4">
                      <ProductList
                        products={group.products}
                        onProductSelect={handleProductSelect}
                        selectedProducts={selectedProducts}
                      />
                      
                      {selectedProducts.size > 0 && (
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <span className="text-sm text-gray-500">
                            {selectedProducts.size} products selected
                          </span>
                          <button
                            onClick={() => handleApplyDiscount(group.id)}
                            disabled={isApplyingDiscount}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isApplyingDiscount ? 'Applying...' : 'Apply Discount'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info box */}
      <div className="bg-primary-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <Tag className="h-5 w-5 text-primary-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-primary-800">Discount Settings</h3>
            <div className="mt-2 text-sm text-primary-700">
              <p>
                Configure discount policies for each product group. When automatic discounts are enabled,
                the system will apply the specified discount to all products in the group.
                For manual mode, select specific products to apply discounts to.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGroups;