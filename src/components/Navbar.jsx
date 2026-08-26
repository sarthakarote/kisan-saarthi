import React, { useState, useEffect } from 'react';
import { Bell, MapPin, Menu, X, Moon, Sun } from 'lucide-react';
import { mockFarmerData } from '../data/mockData';

export default function Navbar() {
  const [demoMode, setDemoMode] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors duration-200">
      <div className="flex items-center justify-between px-4 h-16">
        
        {/* Mobile Menu Button (mock functionality) */}
        <div className="flex items-center md:hidden">
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Location Info */}
        <div className="hidden md:flex flex-col">
          <span className="text-sm text-gray-500 font-medium">Current Location</span>
          <div className="flex items-center text-agri-green font-medium text-sm gap-1">
            <MapPin className="w-4 h-4" />
            {mockFarmerData.location.village}, {mockFarmerData.location.district}
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Demo Mode Toggle */}
          <div className="flex items-center gap-2 bg-agri-yellow/20 px-3 py-1.5 rounded-full">
            <span className="text-sm font-semibold text-agri-brown">Demo Mode</span>
            <button 
              onClick={() => setDemoMode(!demoMode)}
              className={`w-10 h-5 rounded-full relative transition-colors ${demoMode ? 'bg-agri-green' : 'bg-gray-300'}`}
            >
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-transform ${demoMode ? 'translate-x-[22px]' : 'translate-x-[3px]'}`} />
            </button>
          </div>
          
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
          </button>
          
          <div className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 rounded-full bg-agri-green flex items-center justify-center text-white font-bold">
              {mockFarmerData.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{mockFarmerData.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{mockFarmerData.location.state}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
