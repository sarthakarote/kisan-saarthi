import React from 'react';
import { FlaskConical, Sprout, Tractor, TrendingUp, Users, ShoppingCart, ArrowRight } from 'lucide-react';

const steps = [
  { name: 'Soil Analysis', icon: FlaskConical, active: true },
  { name: 'Crop Recommendation', icon: Sprout, active: true },
  { name: 'Grow', icon: Tractor, active: false },
  { name: 'Check Mandi Price', icon: TrendingUp, active: false },
  { name: 'Join Farmer Group', icon: Users, active: false },
  { name: 'Connect With Buyer', icon: ShoppingCart, active: false },
];

export default function JourneyFlow() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm w-full overflow-x-auto transition-colors duration-200">
      <div className="flex items-center justify-between min-w-[800px]">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.name}>
              <div className="flex flex-col items-center relative group">
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    step.active 
                      ? 'bg-agri-green text-white shadow-md shadow-agri-green/30' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`mt-3 text-sm font-semibold text-center w-24 ${
                  step.active ? 'text-agri-green dark:text-agri-green' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {step.name}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 px-4 flex items-center justify-center">
                  <div className={`h-1 w-full rounded-full ${step.active && steps[index+1].active ? 'bg-agri-green' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
