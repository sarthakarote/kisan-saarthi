import React, { useState, useEffect } from 'react';
import { Users, Target, UserPlus, MapPin, CheckCircle2, Clock, Vote, AlertCircle, Check, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getFarmerClusters, getClusterMembers, getClusters, joinCluster, createCluster, voteAdmin, getBuyerRequestsForCluster, respondToRequest } from '../api/client';

export default function FarmerGroup() {
  const { user } = useAuth();
  const [clusters, setClusters] = useState([]);
  const [availableClusters, setAvailableClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'detail', 'create_join'
  
  // Data refresh
  const loadData = () => {
    if (user) {
      setClusters(getFarmerClusters(user.id));
      setAvailableClusters(getClusters().filter(c => !getFarmerClusters(user.id).find(fc => fc.id === c.id)));
    }
  };

  useEffect(() => {
    loadData();
    // Use an interval for the demo to auto-refresh state (since it's localStorage and no subscriptions exist)
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, [user]);

  const handleJoin = (clusterId, qty) => {
    joinCluster(user.id, clusterId, qty);
    loadData();
    setView('list');
  };

  const handleVote = (clusterId) => {
    voteAdmin(clusterId, user.id); // Simple 1-click self-vote for demo purposes
    loadData();
    setSelectedCluster(getFarmerClusters(user.id).find(c => c.id === clusterId));
  };

  if (view === 'list') {
    return (
      <div className="space-y-6 pb-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Clusters</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your crop groups, pool produce, and elect admins.</p>
          </div>
          <button 
            onClick={() => setView('create_join')}
            className="flex items-center justify-center gap-2 bg-agri-green text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <UserPlus className="w-5 h-5" /> Join / Create Cluster
          </button>
        </div>

        {clusters.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">You haven't joined any clusters yet</h3>
            <p className="mt-1 text-gray-500">Join a cluster to start selling in bulk.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clusters.map(cluster => (
              <div key={cluster.id} onClick={() => { setSelectedCluster(cluster); setView('detail'); }} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:border-agri-green transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{cluster.crop_type} Cluster</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                      <MapPin className="w-4 h-4" /> {cluster.region} • {cluster.harvest_window}
                    </div>
                  </div>
                  {cluster.status === 'active' ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Forming
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm">
                    <p className="text-gray-500">Progress</p>
                    <p className="font-bold text-gray-900 dark:text-white">{cluster.current_quantity} / {cluster.target_quantity} t</p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="text-gray-500">Members</p>
                    <p className="font-bold text-gray-900 dark:text-white">{cluster.member_count}</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-agri-green h-2 rounded-full transition-all" 
                    style={{ width: `${Math.min((cluster.current_quantity / cluster.target_quantity) * 100, 100)}%` }}
                  ></div>
                </div>
                
                {cluster.status === 'active' && !cluster.admin_farmer_id && (
                  <div className="bg-orange-50 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 p-2 rounded text-sm font-medium flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Needs Admin Election
                  </div>
                )}
                {cluster.admin_farmer_id === user.id && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 p-2 rounded text-sm font-medium flex items-center justify-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> You are the Admin
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (view === 'create_join') {
    return (
      <div className="space-y-6 max-w-3xl mx-auto pb-12">
        <button onClick={() => setView('list')} className="text-agri-green font-medium hover:underline">&larr; Back to My Clusters</button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Join an Available Cluster</h1>
        
        <div className="space-y-4">
          {availableClusters.map(cluster => (
            <div key={cluster.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
               <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{cluster.crop_type} - {cluster.region}</h3>
                  <p className="text-sm text-gray-500">{cluster.current_quantity}/{cluster.target_quantity} tonnes • {cluster.member_count} members</p>
               </div>
               <button 
                  onClick={() => handleJoin(cluster.id, 5)} // Hardcoded 5 tonnes for demo
                  className="bg-agri-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
               >
                  Join (Add 5t)
               </button>
            </div>
          ))}
          {availableClusters.length === 0 && <p className="text-gray-500">No clusters available to join in your area.</p>}
        </div>
      </div>
    );
  }

  if (view === 'detail' && selectedCluster) {
    const isMember = getFarmerClusters(user.id).some(c => c.id === selectedCluster.id);
    // Auto refresh cluster data
    const freshCluster = getClusters().find(c => c.id === selectedCluster.id) || selectedCluster;
    const members = getClusterMembers(freshCluster.id);
    const requests = getBuyerRequestsForCluster(freshCluster.id);
    const percentage = Math.min((freshCluster.current_quantity / freshCluster.target_quantity) * 100, 100);

    return (
      <div className="space-y-6 pb-12 max-w-5xl mx-auto">
        <button onClick={() => setView('list')} className="text-agri-green font-medium hover:underline">&larr; Back to My Clusters</button>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-900 text-white p-6 md:p-8">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-max px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${freshCluster.status === 'active' ? 'bg-agri-green/80' : 'bg-yellow-500/80'}`}>
                {freshCluster.status === 'active' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {freshCluster.status === 'active' ? 'Active Group' : 'Forming Group'}
              </div>
              {freshCluster.admin_farmer_id === user.id && (
                 <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Admin</span>
              )}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{freshCluster.crop_type} Cluster - {freshCluster.region}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-gray-400 mb-2 text-sm uppercase tracking-wider font-semibold">Target Progress</p>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-4xl font-bold text-agri-light">{freshCluster.current_quantity}</span>
                  <span className="text-gray-300 font-medium mb-1">/ {freshCluster.target_quantity} tonnes</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                  <div className="bg-agri-green h-3 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            </div>

            {/* Admin Election Banner */}
            {freshCluster.status === 'active' && !freshCluster.admin_farmer_id && (
              <div className="bg-orange-500/20 border border-orange-500 rounded-xl p-4 flex items-center justify-between mt-4">
                <div>
                  <h3 className="font-bold text-orange-200 flex items-center gap-2"><Vote className="w-5 h-5"/> Cluster is Active! Elect an Admin.</h3>
                  <p className="text-sm text-orange-100 opacity-80 mt-1">An admin negotiates with buyers on behalf of the group.</p>
                </div>
                <button onClick={() => handleVote(freshCluster.id)} className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                  Vote for Myself
                </button>
              </div>
            )}
          </div>

          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4">Member Name</th>
                  <th className="px-6 py-4">Village</th>
                  <th className="px-6 py-4 text-right">Quantity Pledged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        {member.farmer?.name.charAt(0)}
                      </div>
                      {member.farmer?.name} {member.farmer_id === user.id && "(You)"}
                      {freshCluster.admin_farmer_id === member.farmer_id && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-2 font-bold">Admin</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-4 h-4" /> {member.farmer?.village}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">
                      {member.contributed_qty} t
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ADMIN INCOMING REQUESTS PANEL */}
        {freshCluster.admin_farmer_id === user.id && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-blue-200 dark:border-blue-800 overflow-hidden">
            <div className="bg-blue-50 dark:bg-blue-900/30 border-b border-blue-100 dark:border-blue-800 p-4 flex items-center gap-2 text-blue-800 dark:text-blue-200 font-bold">
              <ShieldAlert className="w-5 h-5" /> Incoming Buyer Requests (Admin View)
            </div>
            <div className="p-4">
              {requests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No open requests from buyers.</p>
              ) : (
                <div className="space-y-4">
                  {requests.map(req => (
                    <div key={req.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 dark:bg-gray-750">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                          {req.buyer?.name} 
                          {req.buyer?.is_verified && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">Requested: <span className="font-bold text-gray-900 dark:text-white">{req.requested_qty} tonnes</span> @ <span className="font-bold text-agri-green">₹{req.offered_price}/qtl</span></p>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={() => respondToRequest(req.id, 'rejected')} className="flex-1 md:flex-none px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium flex items-center justify-center gap-1">
                          <X className="w-4 h-4"/> Reject
                        </button>
                        <button onClick={() => respondToRequest(req.id, 'finalized')} className="flex-1 md:flex-none px-4 py-2 bg-agri-green text-white rounded-lg hover:bg-green-700 font-bold flex items-center justify-center gap-1">
                          <Check className="w-4 h-4"/> Accept Offer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    );
  }

  return null;
}
