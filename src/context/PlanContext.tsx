import React, { createContext, useContext } from 'react';
import { Plan } from '../lib/plans';
import { usePlan } from '../hooks/usePlan';

interface PlanContextType {
  currentPlan: Plan;
  isUpgrading: boolean;
  upgradePlan: (planId: 'pro' | 'growth') => Promise<void>;
  checkAccess: (feature: keyof Plan['features'], value?: any) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const planData = usePlan();

  return (
    <PlanContext.Provider value={planData}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlanContext() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlanContext must be used within a PlanProvider');
  }
  return context;
}