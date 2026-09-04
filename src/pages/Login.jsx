import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getFarmers, getBuyers } from '../api/client';
import { Leaf } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  
  const farmers = getFarmers() || [];
  const buyers = getBuyers() || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Leaf className="mx-auto h-12 w-12 text-agri-green" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to Kissan Saarthi
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Demo Mode: Select a pre-seeded account to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">Farmers</h3>
            <div className="space-y-2">
              {farmers.map(farmer => (
                <button
                  key={farmer.id}
                  onClick={() => login('farmer', farmer.id)}
                  className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <span>{farmer.name}</span>
                  <span className="text-xs text-gray-500">{farmer.village}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">Buyers</h3>
            <div className="space-y-2">
              {buyers.map(buyer => (
                <button
                  key={buyer.id}
                  onClick={() => login('buyer', buyer.id)}
                  className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col text-left">
                    <span>{buyer.name}</span>
                    <span className="text-xs text-gray-500">{buyer.organization}</span>
                  </div>
                  {buyer.is_verified ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Verified</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Unverified</span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
