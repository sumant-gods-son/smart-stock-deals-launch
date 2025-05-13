import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Plan, PLANS } from '../lib/plans';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: Plan;
  feature: string;
  onUpgrade: (planId: string) => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
  feature,
  onUpgrade,
}) => {
  if (!isOpen) return null;

  const getFeatureDescription = (feature: string) => {
    switch (feature) {
      case 'productLimit':
        return 'Increase your product limit';
      case 'automation':
        return 'Enable automatic discount scheduling';
      case 'discountGroups':
        return 'Create more discount groups';
      case 'widgetPlacements':
        return 'Add widgets to more pages';
      default:
        return 'Unlock more features';
    }
  };

  const recommendedPlan = currentPlan.id === 'free' ? PLANS.pro : PLANS.growth;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                Upgrade to {recommendedPlan.name}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {getFeatureDescription(feature)}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-primary-100 bg-primary-50 p-4">
                <h4 className="font-medium text-primary-900">
                  {recommendedPlan.name} Plan Features
                </h4>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center text-sm text-primary-700">
                    <Check size={16} className="mr-2 text-primary-500" />
                    Up to {recommendedPlan.features.productLimit === Infinity ? 'unlimited' : recommendedPlan.features.productLimit} products
                  </li>
                  <li className="flex items-center text-sm text-primary-700">
                    <Check size={16} className="mr-2 text-primary-500" />
                    {recommendedPlan.features.automationEnabled ? 'Automatic' : 'Manual'} discount scheduling
                  </li>
                  <li className="flex items-center text-sm text-primary-700">
                    <Check size={16} className="mr-2 text-primary-500" />
                    {recommendedPlan.features.discountGroupLimit === Infinity ? 'Unlimited' : recommendedPlan.features.discountGroupLimit} discount groups
                  </li>
                  <li className="flex items-center text-sm text-primary-700">
                    <Check size={16} className="mr-2 text-primary-500" />
                    Widget on {recommendedPlan.features.widgetPlacements.length} pages
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">
                    ${recommendedPlan.price}
                  </span>
                  <span className="ml-1 text-gray-500">/month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              onClick={() => onUpgrade(recommendedPlan.id)}
            >
              Upgrade Now
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;