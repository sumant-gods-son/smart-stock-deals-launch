import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { initializeAppBridge, getInstallUrl, handleClientRouting } from '../lib/shopify-auth';

interface ShopifyProviderProps {
  children: React.ReactNode;
}

export const ShopifyProvider: React.FC<ShopifyProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Only initialize Shopify integration in production
    if (import.meta.env.PROD) {
      const app = initializeAppBridge();
      if (!app) {
        // Redirect to install URL if not authenticated
        const shop = new URL(window.location.href).searchParams.get('shop');
        if (shop) {
          window.location.href = getInstallUrl(shop);
        }
        return;
      }

      // Set up client-side routing
      handleClientRouting(app);

      // Handle initial navigation
      const path = location.pathname;
      if (path !== '/auth/callback') {
        navigate(path);
      }

      setIsInitialized(true);
    } else {
      // In development, skip authentication
      setIsInitialized(true);
    }
  }, [location, navigate]);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}