import React from 'react';
import { mockNutrientAnalysis, mockFarmerData } from '../data/mockData';
import NutrientCard from '../components/NutrientCard';
import { ArrowDown, Info } from 'lucide-react';

export default function NutrientAnalysis() {
  return (
    <div className="space-y-8 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nutrient Residue Analysis</h1>
        <p className="text-gray-600 text-lg">Your previous crop and fertilizer history influence what you should grow next. We calculate the estimated remaining nutrients in your soil to make smarter recommendations.</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-12 justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Previous Crop</p>
          <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 inline-block">
            <span className="text-xl font-bold text-gray-800">{mockFarmerData.history.previousCrop}</span>
          </div>
        </div>
        <div className="text-gray-300">
          <ArrowDown className="w-8 h-8 md:-rotate-90" />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Fertilizer Used</p>
          <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 inline-block">
            <span className="text-xl font-bold text-gray-800">{mockFarmerData.history.previousFertilizer}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NutrientCard 
          title="Nitrogen (N)"
          initial={mockNutrientAnalysis.nitrogen.initial}
          cropUsed={mockNutrientAnalysis.nitrogen.cropUsed}
          fertilizerAdded={mockNutrientAnalysis.nitrogen.fertilizerAdded}
          estimatedRemaining={mockNutrientAnalysis.nitrogen.estimatedRemaining}
          color="#3b82f6" // blue
        />
        <NutrientCard 
          title="Phosphorus (P)"
          initial={mockNutrientAnalysis.phosphorus.initial}
          cropUsed={mockNutrientAnalysis.phosphorus.cropUsed}
          fertilizerAdded={mockNutrientAnalysis.phosphorus.fertilizerAdded}
          estimatedRemaining={mockNutrientAnalysis.phosphorus.estimatedRemaining}
          color="#ef4444" // red
        />
        <NutrientCard 
          title="Potassium (K)"
          initial={mockNutrientAnalysis.potassium.initial}
          cropUsed={mockNutrientAnalysis.potassium.cropUsed}
          fertilizerAdded={mockNutrientAnalysis.potassium.fertilizerAdded}
          estimatedRemaining={mockNutrientAnalysis.potassium.estimatedRemaining}
          color="#eab308" // yellow
        />
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex gap-4 items-start">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mt-1">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-2">How do we calculate this?</h3>
          <p className="text-blue-800 text-sm leading-relaxed mb-4">
            Our ML model takes your initial soil test results and simulates the nutrient uptake by your previous crop ({mockFarmerData.history.previousCrop}). We then add the theoretical nutrient contribution of the fertilizers you applied ({mockFarmerData.history.previousFertilizer}) to estimate what's left in the soil right now.
          </p>
          <div className="bg-white/60 p-4 rounded-lg inline-block">
            <span className="font-mono text-sm font-semibold text-blue-900">
              Estimated Remaining = Initial Soil Level - Crop Consumption + Fertilizer Added
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-agri-green to-agri-light text-white rounded-xl p-8 text-center shadow-lg">
        <h2 className="text-xl font-medium text-green-50 mb-2">Recommended Next Crop Based on Residue</h2>
        <p className="text-4xl font-black mb-4">Wheat</p>
        <p className="text-green-50 max-w-2xl mx-auto">
          "Wheat matches the estimated nutrient availability, specifically utilizing the remaining Potassium (K) efficiently while requiring minimal additional Nitrogen (N)."
        </p>
      </div>

    </div>
  );
}
