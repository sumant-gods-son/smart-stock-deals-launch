export interface Plan {
  id: 'free' | 'pro' | 'growth';
  name: string;
  price: number;
  features: {
    productLimit: number;
    timeRanges: number[];
    automationEnabled: boolean;
    discountGroupLimit: number;
    widgetPlacements: ('home' | 'product' | 'cart' | 'thankyou')[];
    analytics: 'basic' | 'advanced' | 'full';
    customization: boolean;
    export: boolean;
    prioritySupport: boolean;
  };
}

export const PLANS: Record<string, Plan> = {
  free: {
    id: 'free',
    name: 'Starter',
    price: 0,
    features: {
      productLimit: 50,
      timeRanges: [30, 60, 90],
      automationEnabled: false,
      discountGroupLimit: 1,
      widgetPlacements: ['home'],
      analytics: 'basic',
      customization: false,
      export: false,
      prioritySupport: false,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    features: {
      productLimit: 500,
      timeRanges: [30, 60, 90, 120],
      automationEnabled: true,
      discountGroupLimit: 3,
      widgetPlacements: ['home', 'product'],
      analytics: 'advanced',
      customization: true,
      export: false,
      prioritySupport: false,
    },
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    price: 24.99,
    features: {
      productLimit: Infinity,
      timeRanges: [30, 60, 90, 120, 150, 180],
      automationEnabled: true,
      discountGroupLimit: Infinity,
      widgetPlacements: ['home', 'product', 'cart', 'thankyou'],
      analytics: 'full',
      customization: true,
      export: true,
      prioritySupport: true,
    },
  },
};

export function checkFeatureAccess(currentPlan: Plan, feature: keyof Plan['features'], value?: any): boolean {
  const planFeature = currentPlan.features[feature];

  switch (feature) {
    case 'productLimit':
      return value <= planFeature;
    case 'timeRanges':
      return value <= planFeature.length;
    case 'widgetPlacements':
      return planFeature.includes(value as any);
    default:
      return !!planFeature;
  }
}