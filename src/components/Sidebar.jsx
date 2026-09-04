import React from 'react';
import { Home, Leaf, FlaskConical, TrendingUp, Users, ShoppingCart, User, HelpCircle, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const farmerNavItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Crop Advisory', path: '/crop-advisory', icon: Leaf },
  { name: 'Nutrient Analysis', path: '/nutrient-analysis', icon: FlaskConical },
  { name: 'Mandi Prices', path: '/mandi-prices', icon: TrendingUp },
  { name: 'My Clusters', path: '/farmer-group', icon: Users },
  { name: 'Profile', path: '/profile', icon: User },
];

const buyerNavItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Browse Clusters', path: '/direct-buyers', icon: ShoppingCart },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function Sidebar() {
  const location = useLocation();
  const { role } = useAuth();
  
  const navItems = role === 'buyer' ? buyerNavItems : farmerNavItems;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col min-h-screen transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-agri-green flex items-center gap-2">
          <Leaf className="w-6 h-6" />
          Kissan Saarthi
        </h1>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-agri-green/10 text-agri-green font-medium dark:bg-agri-green/20' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <ul className="space-y-1">
          <li>
            <Link to="/help" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white">
              <HelpCircle className="w-5 h-5" />
              Help
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white">
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
