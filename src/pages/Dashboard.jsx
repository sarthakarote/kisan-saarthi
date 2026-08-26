import React from 'react';
import { Leaf, TrendingUp, Users, ShoppingCart, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import JourneyFlow from '../components/JourneyFlow';
import NutrientCard from '../components/NutrientCard';
import BuyerCard from '../components/BuyerCard';
import { mockDashboardStats, mockMandiPrices, mockFarmerGroup, mockBuyers, mockNutrientAnalysis, mockFarmerData } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-agri-yellow to-agri-green text-white rounded-2xl p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-2">Namaste, {mockFarmerData.name.split(' ')[0]} 👋</h1>
        <p className="text-agri-green-50 text-lg opacity-90">Let's make your next farming decision smarter.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Recommended Crop" 
          value={mockDashboardStats.recommendedCrop} 
          icon={Leaf} 
          colorClass="bg-green-100 dark:bg-green-900/40 text-agri-green dark:text-green-400" 
        />
        <StatCard 
          title="Current Mandi Price" 
          value={mockDashboardStats.currentMandiPrice} 
          subtitle="per quintal"
          icon={TrendingUp} 
          colorClass="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" 
        />
        <StatCard 
          title="Group Quantity" 
          value={`${mockDashboardStats.groupQuantity} tonnes`} 
          icon={Users} 
          colorClass="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400" 
        />
        <StatCard 
          title="Active Buyer Offers" 
          value={mockDashboardStats.activeBuyerOffers} 
          icon={ShoppingCart} 
          colorClass="bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400" 
        />
      </div>

      {/* SECTION 1: Your Farming Journey */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Farming Journey</h2>
        <JourneyFlow />
      </section>

      {/* Grid Layout for Sections 2 & 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION 2: Your Next Best Crop */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-full transition-colors duration-200">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Next Best Crop</h2>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Recommended for you</p>
                <h3 className="text-4xl font-bold text-agri-green">{mockDashboardStats.recommendedCrop}</h3>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-lg text-center">
                <span className="block text-2xl font-bold text-agri-green">{mockDashboardStats.recommendationScore}%</span>
                <span className="text-xs text-green-700 dark:text-green-400 font-medium">Match Score</span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Why?</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                "Your soil currently has sufficient nitrogen and potassium. Wheat matches the current nutrient profile and seasonal conditions."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border border-gray-100 rounded-lg p-3">
                <span className="block text-xs text-gray-500">Duration</span>
                <span className="font-semibold text-gray-800">120-150 Days</span>
              </div>
              <div className="border border-gray-100 rounded-lg p-3">
                <span className="block text-xs text-gray-500">Water Req.</span>
                <span className="font-semibold text-gray-800">Medium (450mm)</span>
              </div>
            </div>
          </div>
          
          <Link to="/crop-advisory" className="w-full bg-agri-green text-white py-3 rounded-lg font-semibold text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
            View Full Recommendation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* SECTION 3: Nutrient Health */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-full transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nutrient Health</h2>
            <Link to="/nutrient-analysis" className="text-sm text-agri-green font-semibold hover:underline">
              Detailed Analysis
            </Link>
          </div>
          
          <div className="flex gap-4 mb-6 text-sm bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div>
              <span className="block text-gray-500 dark:text-gray-400">Previous Crop</span>
              <span className="font-semibold text-gray-900 dark:text-white">{mockFarmerData.history.previousCrop}</span>
            </div>
            <div className="w-px bg-gray-200 dark:bg-gray-600"></div>
            <div>
              <span className="block text-gray-500 dark:text-gray-400">Previous Fertilizer</span>
              <span className="font-semibold text-gray-900 dark:text-white">{mockFarmerData.history.previousFertilizer}</span>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700">Nitrogen (N)</span>
                <span className="text-gray-900">{mockFarmerData.soilHealth.nitrogen}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${mockFarmerData.soilHealth.nitrogen}%` }}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700">Phosphorus (P)</span>
                <span className="text-gray-900">{mockFarmerData.soilHealth.phosphorus}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${mockFarmerData.soilHealth.phosphorus}%` }}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700">Potassium (K)</span>
                <span className="text-gray-900">{mockFarmerData.soilHealth.potassium}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${mockFarmerData.soilHealth.potassium}%` }}></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Grid Layout for Sections 4 & 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION 4: Mandi Prices Near You */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mandi Prices Near You</h2>
          </div>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Crop</th>
                  <th className="px-4 py-3">Market</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3 rounded-tr-lg">Change</th>
                </tr>
              </thead>
              <tbody>
                {mockMandiPrices.slice(0,3).map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{item.crop}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{item.market}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{item.price}</td>
                    <td className={`px-4 py-3 font-medium ${item.changeType === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {item.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/mandi-prices" className="block w-full text-center text-agri-green font-semibold py-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            View All Mandi Prices
          </Link>
        </section>

        {/* SECTION 5: Your Farmer Group */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between transition-colors duration-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Farmer Group</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{mockFarmerGroup.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{mockFarmerGroup.memberCount} Farmers</p>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span className="text-gray-700 dark:text-gray-300">Combined Quantity</span>
                <span className="text-gray-900 dark:text-white">{mockFarmerGroup.currentQuantity} / {mockFarmerGroup.targetQuantity} Tonnes</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-agri-green h-3 rounded-full transition-all" 
                  style={{ width: `${(mockFarmerGroup.currentQuantity / mockFarmerGroup.targetQuantity) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">74% of target reached</p>
            </div>
          </div>
          
          <Link to="/farmer-group" className="block w-full text-center text-white font-semibold py-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            View Group Details
          </Link>
        </section>
      </div>

      {/* SECTION 6: Buyer Opportunities */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Buyer Opportunities</h2>
          <Link to="/direct-buyers" className="text-sm text-agri-green font-semibold hover:underline">
            View All Offers
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBuyers.slice(0,3).map(buyer => (
            <BuyerCard key={buyer.id} buyer={buyer} />
          ))}
        </div>
      </section>

    </div>
  );
}
