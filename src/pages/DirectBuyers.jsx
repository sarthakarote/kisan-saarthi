import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getActiveClusters, sendBuyerRequest, getBuyerRequestsForBuyer } from '../api/client';
import { mockMandiPrices } from '../data/mockData';
import { MapPin, ShieldCheck, AlertTriangle, Send, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function DirectBuyers() {
  const { user } = useAuth();
  const [activeClusters, setActiveClusters] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [view, setView] = useState('browse'); // 'browse' or 'requests'
  
  // Request Modal State
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [requestQty, setRequestQty] = useState('');
  const [requestPrice, setRequestPrice] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const loadData = () => {
    if (user) {
      setActiveClusters(getActiveClusters());
      setMyRequests(getBuyerRequestsForBuyer(user.id));
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, [user]);

  const handleSendRequest = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    const qty = parseFloat(requestQty);
    const price = parseFloat(requestPrice);

    // GATE 1: Verification
    if (!user.is_verified) {
      setErrorMsg("Verification Required: Only verified buyers with GST/FPO docs can send bulk requests.");
      return;
    }

    // GATE 2: Minimum Bulk Quantity
    if (qty < 10) {
      setErrorMsg("Bulk Minimum Not Met: This platform is for bulk trading. Minimum request is 10 tonnes.");
      return;
    }

    // GATE 3: Price Floor (90% of Mandi)
    const mandiData = mockMandiPrices.find(m => m.crop === selectedCluster.crop_type);
    const mandiPrice = mandiData ? parseFloat(mandiData.price) : 0;
    const priceFloor = mandiPrice * 0.9;
    
    if (price < priceFloor) {
      setErrorMsg(`Price Floor Rejected: Your offer of ₹${price} is too far below the live Mandi rate (₹${mandiPrice}). Please offer a fair price.`);
      return;
    }

    // Passed all gates!
    sendBuyerRequest(user.id, selectedCluster.id, qty, price);
    setSelectedCluster(null);
    setRequestQty('');
    setRequestPrice('');
    setView('requests');
    loadData();
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Marketplace</h1>
          <p className="text-gray-600 dark:text-gray-300">Browse active farmer clusters and send direct bulk purchase requests.</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button 
            onClick={() => setView('browse')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${view === 'browse' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Browse Clusters
          </button>
          <button 
            onClick={() => setView('requests')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${view === 'requests' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
          >
            My Requests
          </button>
        </div>
      </div>

      {!user?.is_verified && view === 'browse' && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
          <div>
            <h3 className="font-bold text-yellow-800 dark:text-yellow-200">Unverified Account</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">You are browsing as an unverified buyer. You can view clusters, but cannot send purchase requests until your documents are verified.</p>
          </div>
        </div>
      )}

      {view === 'browse' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeClusters.length === 0 ? (
            <p className="text-gray-500 col-span-full py-8 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">No active clusters available at the moment.</p>
          ) : (
            activeClusters.map(cluster => (
              <div key={cluster.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{cluster.crop_type}</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold uppercase">Active</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                      <MapPin className="w-4 h-4" /> {cluster.region}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Available Qty:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{cluster.current_quantity} Tonnes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Farmers:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{cluster.member_count} Members</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Harvest Window:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{cluster.harvest_window}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-750 p-4 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => setSelectedCluster(cluster)}
                    className="w-full bg-agri-green text-white font-bold py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Make an Offer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {view === 'requests' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4">Cluster Details</th>
                  <th className="px-6 py-4">Requested Qty</th>
                  <th className="px-6 py-4">Offered Price</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                {myRequests.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">You haven't sent any requests yet.</td></tr>
                ) : (
                  myRequests.map(req => (
                    <tr key={req.id}>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {req.cluster?.crop_type} Cluster<br/>
                        <span className="text-xs text-gray-500 font-normal">{req.cluster?.region}</span>
                      </td>
                      <td className="px-6 py-4">{req.requested_qty} t</td>
                      <td className="px-6 py-4 font-bold">₹{req.offered_price}/qtl</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(req.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        {req.status === 'open' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock className="w-3 h-3"/> Pending</span>}
                        {req.status === 'finalized' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3"/> Finalized</span>}
                        {req.status === 'rejected' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3"/> Rejected</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REQUEST MODAL */}
      {selectedCluster && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button onClick={() => { setSelectedCluster(null); setErrorMsg(null); }} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <XCircle className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Make an Offer</h2>
            <p className="text-sm text-gray-500 mb-6">{selectedCluster.crop_type} Cluster • {selectedCluster.region} • {selectedCluster.current_quantity}t available</p>

            <form onSubmit={handleSendRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Requested Quantity (Tonnes)</label>
                <input 
                  type="number" 
                  required 
                  min="1"
                  value={requestQty}
                  onChange={(e) => setRequestQty(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-agri-green outline-none" 
                  placeholder="e.g. 15"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex justify-between">
                  <span>Offered Price (per Quintal)</span>
                  <span className="text-agri-green font-bold text-xs bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">Mandi Rate: ₹{mockMandiPrices.find(m => m.crop === selectedCluster.crop_type)?.price || '---'}</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input 
                    type="number" 
                    required 
                    value={requestPrice}
                    onChange={(e) => setRequestPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-agri-green outline-none" 
                    placeholder="e.g. 2350"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-200 dark:border-red-800 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <button type="submit" className="w-full bg-agri-green text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mt-6">
                <Send className="w-5 h-5" /> Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
