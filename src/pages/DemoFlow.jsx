import React from 'react';
import { Server, Database, BrainCircuit, Globe, Smartphone, ArrowRight } from 'lucide-react';

export default function DemoFlow() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">How Kissan Saarthi Works</h1>
        <p className="text-gray-600">Technical architecture and data flow for SIH Judges.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col gap-6 relative">
          {/* Vertical line connecting blocks (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-1 bg-gray-200 -ml-0.5"></div>

          {/* Node 1 */}
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="w-full md:w-1/2 flex justify-end md:pr-10">
              <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl w-full text-right shadow-sm">
                <h3 className="font-bold text-blue-900 mb-1">React Frontend</h3>
                <p className="text-sm text-blue-800">Farmer friendly UI. Handles state, navigation, and mock data currently shown.</p>
              </div>
            </div>
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg border-4 border-white">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="w-full md:w-1/2 pl-10 hidden md:block">
              <p className="text-sm text-gray-500 font-medium italic">User Interaction Layer</p>
            </div>
          </div>

          {/* Node 2 */}
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="w-full md:w-1/2 pr-10 hidden md:block text-right">
              <p className="text-sm text-gray-500 font-medium italic">API Gateway & Logic</p>
            </div>
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg border-4 border-white">
              <Server className="w-6 h-6" />
            </div>
            <div className="w-full md:w-1/2 flex justify-start md:pl-10">
              <div className="bg-green-50 border border-green-200 p-5 rounded-xl w-full shadow-sm">
                <h3 className="font-bold text-green-900 mb-1">FastAPI Backend</h3>
                <p className="text-sm text-green-800">Connects frontend to ML models and DB. Will be integrated post-frontend completion.</p>
              </div>
            </div>
          </div>

          {/* Node 3 */}
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="w-full md:w-1/2 flex justify-end md:pr-10">
              <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl w-full text-right shadow-sm">
                <h3 className="font-bold text-purple-900 mb-1">ML Recommendation Engine</h3>
                <p className="text-sm text-purple-800">Analyzes NPK residue, soil history, and weather to recommend crops and compute nutrient loss.</p>
              </div>
            </div>
            <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg border-4 border-white">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div className="w-full md:w-1/2 pl-10 hidden md:block">
              <p className="text-sm text-gray-500 font-medium italic">Intelligence Layer</p>
            </div>
          </div>

          {/* Node 4 */}
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
             <div className="w-full md:w-1/2 pr-10 hidden md:block text-right">
              <p className="text-sm text-gray-500 font-medium italic">External Integrations</p>
            </div>
            <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg border-4 border-white">
              <Globe className="w-6 h-6" />
            </div>
            <div className="w-full md:w-1/2 flex justify-start md:pl-10">
              <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl w-full shadow-sm">
                <h3 className="font-bold text-orange-900 mb-1">Mandi Price API</h3>
                <p className="text-sm text-orange-800">Fetches live market prices from government portals (e.g. e-NAM, Agmarknet).</p>
              </div>
            </div>
          </div>

          {/* Node 5 */}
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="w-full md:w-1/2 flex justify-end md:pr-10">
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl w-full text-right shadow-sm">
                <h3 className="font-bold text-gray-900 mb-1">PostgreSQL Database</h3>
                <p className="text-sm text-gray-600">Stores farmer profiles, group formations, buyer requirements, and transaction history.</p>
              </div>
            </div>
            <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg border-4 border-white">
              <Database className="w-6 h-6" />
            </div>
            <div className="w-full md:w-1/2 pl-10 hidden md:block">
              <p className="text-sm text-gray-500 font-medium italic">Storage Layer</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
