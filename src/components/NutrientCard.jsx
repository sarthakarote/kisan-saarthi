import React from 'react';

export default function NutrientCard({ title, initial, cropUsed, fertilizerAdded, estimatedRemaining, color }) {
  const percentage = Math.min(Math.max((estimatedRemaining / initial) * 100, 0), 100);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{title}</h3>
        <span className="font-semibold text-gray-600 dark:text-gray-400">{estimatedRemaining} kg/ha</span>
      </div>
      
      {/* Visual Bar */}
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-6 relative overflow-hidden">
        <div 
          className="h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Initial Level</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{initial} kg/ha</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>Crop Consumption</span>
          <span className="font-medium">-{cropUsed} kg/ha</span>
        </div>
        <div className="flex justify-between text-agri-green dark:text-agri-green">
          <span>Fertilizer Added</span>
          <span className="font-medium">+{fertilizerAdded} kg/ha</span>
        </div>
        <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between font-bold text-gray-800 dark:text-gray-200">
          <span>Estimated Remaining</span>
          <span>{estimatedRemaining} kg/ha</span>
        </div>
      </div>
    </div>
  );
}
