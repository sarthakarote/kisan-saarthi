import { 
  seedFarmers, 
  seedBuyers, 
  seedClusters, 
  seedClusterMembers, 
  seedBuyerRequests 
} from '../data/mockData';

const DB_KEY = 'kisan_saarthi_db';

// Initialize the local storage database
export const initDB = () => {
  if (!localStorage.getItem(DB_KEY)) {
    const initialData = {
      farmers: seedFarmers,
      buyers: seedBuyers,
      clusters: seedClusters,
      cluster_members: seedClusterMembers,
      buyer_requests: seedBuyerRequests,
    };
    localStorage.setItem(DB_KEY, JSON.stringify(initialData));
  }
};

const getDB = () => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : null;
};

const saveDB = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// --- AUTH MOCK ---
export const login = (role, userId) => {
  localStorage.setItem('auth_role', role);
  localStorage.setItem('auth_user_id', userId);
};

export const logout = () => {
  localStorage.removeItem('auth_role');
  localStorage.removeItem('auth_user_id');
};

export const getCurrentUser = () => {
  const role = localStorage.getItem('auth_role');
  const userId = localStorage.getItem('auth_user_id');
  if (!role || !userId) return null;
  
  const db = getDB();
  if (role === 'farmer') {
    return { role, user: db.farmers.find(f => f.id === userId) };
  } else if (role === 'buyer') {
    return { role, user: db.buyers.find(b => b.id === userId) };
  }
  return null;
};

export const getFarmers = () => getDB().farmers;
export const getBuyers = () => getDB().buyers;

// --- CLUSTERS ---
export const getClusters = () => {
  return getDB().clusters;
};

export const getFarmerClusters = (farmerId) => {
  const db = getDB();
  const membership = db.cluster_members.filter(cm => cm.farmer_id === farmerId);
  const clusterIds = membership.map(cm => cm.cluster_id);
  return db.clusters.filter(c => clusterIds.includes(c.id));
};

export const createCluster = (farmerId, cropType, region, harvestWindow, targetQty, contributedQty) => {
  const db = getDB();
  const newClusterId = 'c' + Date.now();
  const newCluster = {
    id: newClusterId,
    crop_type: cropType,
    region,
    harvest_window: harvestWindow,
    status: 'forming',
    admin_farmer_id: null,
    max_members: 50,
    member_count: 1,
    target_quantity: targetQty,
    current_quantity: contributedQty,
  };
  
  const newMember = {
    id: 'cm' + Date.now(),
    cluster_id: newClusterId,
    farmer_id: farmerId,
    contributed_qty: contributedQty
  };

  db.clusters.push(newCluster);
  db.cluster_members.push(newMember);
  saveDB(db);
  return newCluster;
};

export const joinCluster = (farmerId, clusterId, contributedQty) => {
  const db = getDB();
  const cluster = db.clusters.find(c => c.id === clusterId);
  if (!cluster) throw new Error('Cluster not found');

  const newMember = {
    id: 'cm' + Date.now(),
    cluster_id: clusterId,
    farmer_id: farmerId,
    contributed_qty: contributedQty
  };

  db.cluster_members.push(newMember);
  cluster.member_count += 1;
  cluster.current_quantity += contributedQty;

  if (cluster.status === 'forming' && cluster.current_quantity >= cluster.target_quantity) {
    cluster.status = 'active';
  }
  saveDB(db);
};

export const getClusterMembers = (clusterId) => {
  const db = getDB();
  const memberships = db.cluster_members.filter(cm => cm.cluster_id === clusterId);
  return memberships.map(cm => {
    const farmer = db.farmers.find(f => f.id === cm.farmer_id);
    return { ...cm, farmer };
  });
};

export const voteAdmin = (clusterId, farmerId) => {
  const db = getDB();
  const cluster = db.clusters.find(c => c.id === clusterId);
  if (cluster) {
    cluster.admin_farmer_id = farmerId;
    saveDB(db);
  }
};

// --- BUYER REQUESTS ---
export const getActiveClusters = () => {
  return getDB().clusters.filter(c => c.status === 'active');
};

export const sendBuyerRequest = (buyerId, clusterId, requestedQty, offeredPrice) => {
  const db = getDB();
  const newRequest = {
    id: 'br' + Date.now(),
    cluster_id: clusterId,
    buyer_id: buyerId,
    requested_qty: requestedQty,
    offered_price: offeredPrice,
    status: 'open',
    rejection_reason: null,
    created_at: new Date().toISOString()
  };
  db.buyer_requests.push(newRequest);
  saveDB(db);
};

export const getBuyerRequestsForBuyer = (buyerId) => {
  const db = getDB();
  return db.buyer_requests.filter(br => br.buyer_id === buyerId).map(br => {
     const cluster = db.clusters.find(c => c.id === br.cluster_id);
     return { ...br, cluster };
  });
};

export const getBuyerRequestsForCluster = (clusterId) => {
  const db = getDB();
  return db.buyer_requests.filter(br => br.cluster_id === clusterId && br.status === 'open').map(br => {
    const buyer = db.buyers.find(b => b.id === br.buyer_id);
    return { ...br, buyer };
  });
};

export const respondToRequest = (requestId, responseStatus, newPrice = null) => {
  const db = getDB();
  const req = db.buyer_requests.find(br => br.id === requestId);
  if (req) {
    req.status = responseStatus;
    if (newPrice) {
       req.offered_price = newPrice;
    }
    saveDB(db);
  }
};
