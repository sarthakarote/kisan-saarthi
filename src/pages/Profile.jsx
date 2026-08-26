import React from 'react';
import { mockFarmerData } from '../data/mockData';
import { User, MapPin, Phone, Leaf, History, TestTube2 } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Farmer Profile</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-agri-green h-32 w-full relative">
          <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-full p-1 shadow-md">
            <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center text-4xl font-bold text-agri-green">
              {mockFarmerData.name.charAt(0)}
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{mockFarmerData.name}</h2>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {mockFarmerData.location.village}, {mockFarmerData.location.district}</span>
                <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {mockFarmerData.phone}</span>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-agri-green" /> Farm Details
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Farm Size</span>
              <span className="font-semibold text-gray-900">{mockFarmerData.farmSize}</span>
            </li>
            <li className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Primary Crops</span>
              <span className="font-semibold text-gray-900">{mockFarmerData.primaryCrops.join(', ')}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TestTube2 className="w-5 h-5 text-agri-green" /> Latest Soil Health
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Nitrogen (N)</span>
              <span className="font-semibold text-gray-900">{mockFarmerData.soilHealth.nitrogen} kg/ha</span>
            </li>
            <li className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Phosphorus (P)</span>
              <span className="font-semibold text-gray-900">{mockFarmerData.soilHealth.phosphorus} kg/ha</span>
            </li>
            <li className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Potassium (K)</span>
              <span className="font-semibold text-gray-900">{mockFarmerData.soilHealth.potassium} kg/ha</span>
            </li>
            <li className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">pH Level</span>
              <span className="font-semibold text-gray-900">{mockFarmerData.soilHealth.ph}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
