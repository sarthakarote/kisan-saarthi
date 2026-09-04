import React from 'react';
import { mockMandiPrices } from '../data/mockData';
import { AlertTriangle, TrendingUp, Filter, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function MandiPrices() {
  const chartData = mockMandiPrices.map(item => ({
    name: item.market,
    price: parseInt(item.price.replace('₹', '').replace(',', ''))
  }));

  const traderOffer = 4900;
  const mandiModal = 5420;
  const diff = mandiModal - traderOffer;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Know Your Market Price</h1>
          <p className="text-gray-600 dark:text-gray-300">Check mandi prices before you sell to ensure fair compensation.</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input type="text" placeholder="Search crop or mandi..." className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-agri-green outline-none w-full md:w-64" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 shadow-sm font-medium">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-agri-green text-white rounded-xl p-6 shadow-md md:col-span-1">
          <div className="flex items-center gap-2 mb-4 bg-white/20 w-max px-3 py-1 rounded-full text-sm font-semibold">
            <TrendingUp className="w-4 h-4" /> Soybean
          </div>
          <p className="text-green-100 mb-1">Current Average Price</p>
          <p className="text-4xl font-bold mb-6">₹5,420<span className="text-lg font-normal">/qtl</span></p>
          
          <div className="space-y-3 pt-4 border-t border-white/20">
            <div className="flex justify-between">
              <span className="text-green-100">Highest (Lasalgaon)</span>
              <span className="font-semibold text-white">₹5,650</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-100">Lowest (Yeola)</span>
              <span className="font-semibold text-white">₹5,180</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 md:col-span-2 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Price Trend Across Markets</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#6b7280'}} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.price === mandiModal ? '#2E7D32' : '#81C784'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Trader Offer vs Mandi Price Section */}
      <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <AlertTriangle className="w-32 h-32 text-orange-600" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" /> Trader Offer vs Mandi Price
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-orange-100 dark:border-gray-700">
            <div className="text-center flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Local Trader Offered</p>
              <p className="text-3xl font-bold text-red-600">₹{traderOffer}</p>
            </div>
            
            <div className="text-gray-300 dark:text-gray-600 font-bold text-2xl hidden md:block">VS</div>
            
            <div className="text-center flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Mandi Modal Price</p>
              <p className="text-3xl font-bold text-agri-green">₹{mandiModal}</p>
            </div>
            
            <div className="w-px h-16 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
            
            <div className="text-center flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Difference</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{diff}/qtl</p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-orange-800 dark:text-orange-200 font-medium text-lg">
              You could lose <span className="font-bold text-red-600">₹{diff} per quintal</span> by accepting the local trader's offer without checking mandi prices!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 dark:text-white">Live Mandi Prices</h3>
          <span className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Live Updates
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">Crop</th>
                <th className="px-6 py-4">Market</th>
                <th className="px-6 py-4">Min Price</th>
                <th className="px-6 py-4">Max Price</th>
                <th className="px-6 py-4">Modal Price</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
              {mockMandiPrices.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{item.crop}</td>
                  <td className="px-6 py-4">{item.market}</td>
                  <td className="px-6 py-4">₹{parseInt(item.price.replace('₹', '').replace(',', '')) - 200}</td>
                  <td className="px-6 py-4">₹{parseInt(item.price.replace('₹', '').replace(',', '')) + 300}</td>
                  <td className="px-6 py-4 font-bold text-agri-green">{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.changeType === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.changeType === 'up' ? '↑' : '↓'} {item.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
