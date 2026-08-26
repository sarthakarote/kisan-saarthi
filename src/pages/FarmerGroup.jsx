import React from 'react';
import { mockFarmerGroup } from '../data/mockData';
import { Users, Target, UserPlus, MapPin, CheckCircle2, Clock } from 'lucide-react';

export default function FarmerGroup() {
  const percentage = (mockFarmerGroup.currentQuantity / mockFarmerGroup.targetQuantity) * 100;

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Groups</h1>
          <p className="text-gray-600">Sell together to meet bulk requirements and negotiate better prices.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-agri-green text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors">
          <UserPlus className="w-5 h-5" /> Create / Join Group
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 text-white p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2 bg-white/20 w-max px-3 py-1 rounded-full text-sm font-semibold">
            <Users className="w-4 h-4" /> Active Group
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{mockFarmerGroup.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-400 mb-2 text-sm uppercase tracking-wider font-semibold">Target Progress</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-bold text-agri-light">{mockFarmerGroup.currentQuantity}</span>
                <span className="text-gray-300 font-medium mb-1">/ {mockFarmerGroup.targetQuantity} tonnes</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                <div 
                  className="bg-agri-green h-3 rounded-full transition-all" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">{percentage.toFixed(0)}% reached. We need {mockFarmerGroup.targetQuantity - mockFarmerGroup.currentQuantity} more tonnes to fulfill the Reliance Retail contract.</p>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-agri-light/20 rounded-full flex items-center justify-center text-agri-light">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">24 Farmers</p>
                    <p className="text-gray-400 text-sm">Currently contributing</p>
                  </div>
                </div>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100">Invite</button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Member Name</th>
                <th className="px-6 py-4">Village</th>
                <th className="px-6 py-4 text-right">Quantity Pledged</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {mockFarmerGroup.members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {member.name.charAt(0)}
                    </div>
                    {member.name} {member.id === 1 && "(You)"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-4 h-4" /> {member.village}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">
                    {member.quantity} t
                  </td>
                  <td className="px-6 py-4 text-center">
                    {member.status === "Confirmed" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Find Farmers Near Me */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-1">Find Farmers Near Me</h3>
            <p className="text-blue-800">12 farmers near Ozar are currently growing Soybean and looking for a group.</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors w-full md:w-auto flex-shrink-0">
          View Nearby Farmers
        </button>
      </div>

    </div>
  );
}
