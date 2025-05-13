import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BarChart, LayoutDashboard, Settings as SettingsIcon, ShoppingBag, Tag } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ProductGroups from './pages/ProductGroups';
import WidgetCustomizer from './pages/WidgetCustomizer';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import AuthCallback from './components/AuthCallback';
import Layout from './components/Layout';
import { ShopifyProvider } from './components/ShopifyProvider';
import { PlanProvider } from './context/PlanContext';

function App() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Product Groups', path: '/product_groups', icon: <Tag size={20} /> },
    { name: 'Widget', path: '/widget', icon: <ShoppingBag size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart size={20} /> },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon size={20} /> },
  ];

  return (
    <Router>
      <ShopifyProvider>
        <PlanProvider>
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route element={<Layout navItems={navItems} />}>
              <Route index element={<Dashboard />} />
              <Route path="product_groups" element={<ProductGroups />} />
              <Route path="widget" element={<WidgetCustomizer />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </PlanProvider>
      </ShopifyProvider>
    </Router>
  );
}

export default App;