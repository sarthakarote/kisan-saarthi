import React from 'react';
import { mockBuyers } from '../data/mockData';
import BuyerCard from '../components/BuyerCard';
import { CheckCircle2, ArrowRightLeft, MapPin } from 'lucide-react';

export default function DirectBuyers() {
  return (
    <div className="space-y-8 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Directly to Buyers</h1>
        <p className="text-gray-600 text-lg">Connect your farmer group with verified institutional buyers and eliminate middlemen.</p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-agri-green text-white flex items-center justify-center text-sm">1</span> 
          Available Buyer Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBuyers.map(buyer => (
            <BuyerCard key={buyer.id} buyer={buyer} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-agri-green text-white flex items-center justify-center text-sm">2</span> 
          Offer Comparison
        </h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Buyer</th>
                  <th className="px-6 py-4">Requirement</th>
                  <th className="px-6 py-4">Offered Price</th>
                  <th className="px-6 py-4">Distance</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {mockBuyers.map((buyer, idx) => (
                  <tr key={buyer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{buyer.name}</td>
                    <td className="px-6 py-4">{buyer.quantity} {buyer.crop}</td>
                    <td className="px-6 py-4 font-bold text-agri-green">{buyer.price}/qtl</td>
                    <td className="px-6 py-4 text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {idx === 0 ? '120 km' : idx === 1 ? '15 km' : '205 km'}
                    </td>
                    <td className="px-6 py-4">
                      {buyer.verified ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-agri-green font-bold hover:underline">Contact</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
