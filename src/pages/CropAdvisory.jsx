import React, { useState } from 'react';
import { Leaf, Droplets, Sun, MapPin, CheckCircle2 } from 'lucide-react';
import { mockDashboardStats } from '../data/mockData';

export default function CropAdvisory() {
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  if (showResult) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Personalized Recommendation</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-green-100 dark:border-gray-700 shadow-sm relative overflow-hidden transition-colors duration-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 dark:bg-green-900/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
                <CheckCircle2 className="w-4 h-4" />
                Best Match Found
              </div>
              
              <h2 className="text-5xl font-black text-agri-green dark:text-agri-green mb-2">{mockDashboardStats.recommendedCrop}</h2>
              <div className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-6 flex items-center gap-2">
                Suitability Score: <span className="text-2xl font-bold text-green-600 dark:text-green-400">{mockDashboardStats.recommendationScore}%</span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-agri-green" />
                  Why did we recommend this?
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-agri-green rounded-full mt-2"></div>
                    Suitable for your current soil nutrient profile (high K, moderate N).
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-agri-green rounded-full mt-2"></div>
                    Perfect match for the upcoming Rabi season in your district.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-agri-green rounded-full mt-2"></div>
                    High local market demand expected during harvest time.
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="w-full md:w-72 space-y-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"><Droplets className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Water Req.</p>
                  <p className="font-bold text-gray-900 dark:text-white">450 - 650 mm</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg"><Sun className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Duration</p>
                  <p className="font-bold text-gray-900 dark:text-white">120 - 150 Days</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg"><TrendingUp className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Expected Price</p>
                  <p className="font-bold text-gray-900 dark:text-white">₹2,250 / quintal</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-4 relative z-10">
            <button onClick={() => setShowResult(false)} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Recalculate
            </button>
            <button className="px-6 py-2 bg-agri-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
              Save Recommendation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Find the Best Crop for Your Farm</h1>
        <p className="text-gray-600 dark:text-gray-400">Enter your soil and farming details to get a personalized recommendation.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
        {/* Progress indicator */}
        <div className="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`flex-1 h-1.5 ${s <= step ? 'bg-agri-green' : 'bg-transparent'}`}></div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-agri-green" /> Location Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                  <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-agri-green focus:border-agri-green outline-none" defaultValue="Maharashtra">
                    <option>Maharashtra</option>
                    <option>Madhya Pradesh</option>
                    <option>Gujarat</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">District</label>
                  <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-agri-green focus:border-agri-green outline-none" defaultValue="Nashik">
                    <option>Nashik</option>
                    <option>Pune</option>
                    <option>Jalgaon</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Village (Optional)</label>
                  <input type="text" placeholder="Enter village name" defaultValue="Ozar" className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-agri-green focus:border-agri-green outline-none" />
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)} className="mt-8 w-full bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
                Next Step
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-6">
                <FlaskConical className="w-5 h-5 text-agri-green" /> Soil Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nitrogen (N) kg/ha</label>
                  <input type="number" defaultValue={80} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-agri-green outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phosphorus (P) kg/ha</label>
                  <input type="number" defaultValue={50} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-agri-green outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Potassium (K) kg/ha</label>
                  <input type="number" defaultValue={70} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-agri-green outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">pH Level</label>
                  <input type="number" step="0.1" defaultValue={6.8} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-agri-green outline-none" />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Back</button>
                <button type="button" onClick={() => setStep(3)} className="w-2/3 bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">Next Step</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Previous Crop</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Soybean', 'Cotton', 'Maize', 'Wheat', 'Rice', 'Sugarcane'].map((crop) => (
                  <div key={crop} className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${crop === 'Soybean' ? 'border-agri-green bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-agri-green hover:bg-green-50/50 dark:hover:bg-green-900/10'}`}>
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${crop === 'Soybean' ? 'bg-agri-green text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                        <Leaf className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{crop}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setStep(2)} className="w-1/3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Back</button>
                <button type="button" onClick={() => setStep(4)} className="w-2/3 bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">Next Step</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Previous Fertilizer Used</h2>
              <div className="space-y-3">
                {['DAP', 'Urea', 'NPK 10:26:26', 'MOP', 'SSP'].map((fert) => (
                  <label key={fert} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <input type="checkbox" defaultChecked={fert === 'DAP' || fert === 'Urea'} className="w-5 h-5 text-agri-green rounded focus:ring-agri-green" />
                    <span className="font-medium text-gray-900 dark:text-white">{fert}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setStep(3)} className="w-1/3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Back</button>
                <button type="button" onClick={() => setStep(5)} className="w-2/3 bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">Next Step</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Upcoming Season</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Kharif', 'Rabi', 'Zaid'].map((season) => (
                  <label key={season} className={`relative flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${season === 'Rabi' ? 'border-agri-green bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-agri-green'}`}>
                    <input type="radio" name="season" value={season} defaultChecked={season === 'Rabi'} className="absolute top-4 right-4 text-agri-green focus:ring-agri-green" />
                    <span className="font-bold text-lg text-gray-900 dark:text-white mt-2">{season}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setStep(4)} className="w-1/3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Back</button>
                <button type="submit" className="w-2/3 bg-agri-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg dark:shadow-none shadow-green-200">Get Crop Recommendation</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
