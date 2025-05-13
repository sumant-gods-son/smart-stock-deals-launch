import { useState, useCallback } from 'react';
import { Plan, PLANS, checkFeatureAccess } from '../lib/plans';

export function usePlan() {
  const [currentPlan, setCurrentPlan] = useState<Plan>(PLANS.free);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const upgradePlan = useCallback(async (planId: 'pro' | 'growth') => {
    setIsUpgrading(true);
    try {
      const response = await fetch('/.netlify/functions/shopify-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'createSubscription',
          planId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upgrade plan');
      }

      const data = await response.json();
      
      // Redirect to Shopify confirmation URL
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      }
    } catch (error) {
      console.error('Error upgrading plan:', error);
    } finally {
      setIsUpgrading(false);
    }
  }, []);

  const checkAccess = useCallback((feature: keyof Plan['features'], value?: any) => {
    return checkFeatureAccess(currentPlan, feature, value);
  }, [currentPlan]);

  return {
    currentPlan,
    isUpgrading,
    upgradePlan,
    checkAccess
  };
}