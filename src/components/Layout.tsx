import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface LayoutProps {
  children?: React.ReactNode;
  navItems: NavItem[];
}

const Layout: React.FC<LayoutProps> = ({ navItems }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static`}
      >
        {/* App logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Smart Stock Deals" className="w-8 h-8" />
            <span className="ml-2 text-lg font-semibold text-gray-900">Smart Stock Deals</span>
          </Link>
          <button 
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col h-[calc(100%-4rem)] p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col lg:pl-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 sm:px-6">
          <button
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-900 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent-500 rounded-full"></span>
            </button>
            <div className="ml-4 relative flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                SM
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">Shop Manager</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;