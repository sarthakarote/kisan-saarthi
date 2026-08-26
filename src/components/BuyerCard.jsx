import React from 'react';
import { MapPin, Clock, CheckCircle2, Factory } from 'lucide-react';

export default function BuyerCard({ buyer }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden">
      {buyer.verified && (
        <div className="absolute top-0 right-0 bg-agri-green text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Verified
        </div>
      )}
      
      <div className="flex gap-3 items-start mb-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
          <Factory className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{buyer.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{buyer.type}</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          {buyer.location}
        </div>
        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
          <span className="text-sm text-gray-500 dark:text-gray-400">Requirement</span>
          <span className="font-bold text-gray-900 dark:text-white">{buyer.quantity} {buyer.crop}</span>
        </div>
        <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded-lg">
          <span className="text-sm text-green-700 dark:text-green-400">Offered Price</span>
          <span className="font-bold text-green-700 dark:text-green-400 text-lg">{buyer.price}/qtl</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          Expires in {buyer.deadline}
        </div>
        <button className="bg-agri-green text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
          View Offer
        </button>
      </div>
    </div>
  );
}
