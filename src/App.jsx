import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

import CropAdvisory from './pages/CropAdvisory';
import NutrientAnalysis from './pages/NutrientAnalysis';
import MandiPrices from './pages/MandiPrices';
import FarmerGroup from './pages/FarmerGroup';
import DirectBuyers from './pages/DirectBuyers';
import Profile from './pages/Profile';
import DemoFlow from './pages/DemoFlow';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainApp() {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-agri-green">Loading...</div>;

  if (!user) {
    return <Login />;
  }
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/crop-advisory" element={<CropAdvisory />} />
                <Route path="/nutrient-analysis" element={<NutrientAnalysis />} />
                <Route path="/mandi-prices" element={<MandiPrices />} />
                <Route path="/farmer-group" element={<FarmerGroup />} />
                <Route path="/direct-buyers" element={<DirectBuyers />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/help" element={<DemoFlow />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
