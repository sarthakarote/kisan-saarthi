export const mockFarmerData = {
  name: "sarthak Arote",
  location: {
    village: "Ozar",
    district: "Nashik",
    state: "Maharashtra"
  },
  phone: "+91 98765 43210",
  farmSize: "3.5 Acres",
  primaryCrops: ["Soybean", "Onion", "Wheat"],
  soilHealth: {
    nitrogen: 68,
    phosphorus: 52,
    potassium: 74,
    ph: 6.8
  },
  history: {
    previousCrop: "Soybean",
    previousFertilizer: "DAP + Urea",
  }
};

export const mockDashboardStats = {
  recommendedCrop: "Wheat",
  currentMandiPrice: "₹2,250",
  groupQuantity: "18.5",
  activeBuyerOffers: 4,
  recommendationScore: 92,
};

export const mockMandiPrices = [
  { id: 1, crop: "Soybean", market: "Nashik", price: "5420", change: "+4.2%", changeType: "up" },
  { id: 2, crop: "Soybean", market: "Lasalgaon", price: "5280", change: "+2.1%", changeType: "up" },
  { id: 3, crop: "Soybean", market: "Pune", price: "5510", change: "+5.3%", changeType: "up" },
  { id: 4, crop: "Wheat", market: "Nashik", price: "2250", change: "-1.2%", changeType: "down" },
  { id: 5, crop: "Wheat", market: "Lasalgaon", price: "2300", change: "+0.5%", changeType: "up" },
  { id: 6, crop: "Cotton", market: "Nagpur", price: "7200", change: "+1.1%", changeType: "up" },
  { id: 7, crop: "Cotton", market: "Amravati", price: "7150", change: "-0.5%", changeType: "down" },
  { id: 8, crop: "Mustard", market: "Jaipur", price: "4800", change: "+2.0%", changeType: "up" },
  { id: 9, crop: "Onion", market: "Lasalgaon", price: "1800", change: "-5.0%", changeType: "down" },
];

export const mockFarmerGroup = {
  name: "Nashik Soybean Farmers Group",
  memberCount: 24,
  currentQuantity: 18.5,
  targetQuantity: 25,
  members: [
    { id: 1, name: "Sarthak Arote", village: "Ozar", quantity: 1.2, status: "Confirmed" },
    { id: 2, name: "Tanuj Patil", village: "Ozar", quantity: 0.8, status: "Confirmed" },
    { id: 3, name: "Gouresh Kohli", village: "Dindori", quantity: 1.5, status: "Confirmed" },
    { id: 4, name: "Priyanshu Girap ", village: "Pimpalgaon", quantity: 2.1, status: "Pending" },
  ]
};

export const mockBuyers = [
  {
    id: 1,
    name: "Reliance Retail",
    type: "Institutional Buyer",
    location: "Mumbai",
    crop: "Soybean",
    quantity: "10 tonnes",
    price: "₹5,550",
    deadline: "2 days",
    verified: true
  },
  {
    id: 2,
    name: "District Food Procurement Centre",
    type: "Govt. Procurement",
    location: "Nashik",
    crop: "Soybean",
    quantity: "8 tonnes",
    price: "₹5,500",
    deadline: "5 days",
    verified: true
  },
  {
    id: 3,
    name: "AgriTrade Exporters",
    type: "Private Trader",
    location: "Pune",
    crop: "Soybean",
    quantity: "15 tonnes",
    price: "₹5,480",
    deadline: "1 week",
    verified: false
  }
];

export const mockNutrientAnalysis = {
  nitrogen: { initial: 80, cropUsed: 35, fertilizerAdded: 25, estimatedRemaining: 70 },
  phosphorus: { initial: 50, cropUsed: 20, fertilizerAdded: 15, estimatedRemaining: 45 },
  potassium: { initial: 70, cropUsed: 25, fertilizerAdded: 10, estimatedRemaining: 55 }
};

// --- NEW SCHEMA SEED DATA FOR API CLIENT ---

export const seedFarmers = [
  { id: "f1", name: "Sarthak Arote", village: "Ozar", phone: "+91 98765 43210" },
  { id: "f2", name: "Tanuj Patil", village: "Ozar", phone: "+91 98765 43211" },
  { id: "f3", name: "Gouresh Kohli", village: "Dindori", phone: "+91 98765 43212" },
  { id: "f4", name: "Priyanshu Girap", village: "Pimpalgaon", phone: "+91 98765 43213" },
  { id: "f5", name: "Ramesh Kumar", village: "Niphad", phone: "+91 98765 43214" },
];

export const seedBuyers = [
  { id: "b1", name: "Reliance Retail", organization: "Reliance", is_verified: true, verification_doc_url: "dummy.pdf" },
  { id: "b2", name: "Govt Procurement", organization: "FCI", is_verified: true, verification_doc_url: "dummy2.pdf" },
  { id: "b3", name: "Local Trader Bob", organization: "Bob Trades", is_verified: false, verification_doc_url: null },
];

export const seedClusters = [
  {
    id: "c1",
    crop_type: "Wheat",
    region: "Nashik",
    harvest_window: "April 2024",
    status: "active",
    admin_farmer_id: null, // Needs election
    max_members: 50,
    member_count: 5,
    target_quantity: 50,
    current_quantity: 60,
  },
  {
    id: "c2",
    crop_type: "Soybean",
    region: "Nashik",
    harvest_window: "October 2024",
    status: "forming",
    admin_farmer_id: null,
    max_members: 50,
    member_count: 2,
    target_quantity: 100,
    current_quantity: 45,
  }
];

export const seedClusterMembers = [
  // Wheat Cluster (c1) members
  { id: "cm1", cluster_id: "c1", farmer_id: "f1", contributed_qty: 10 },
  { id: "cm2", cluster_id: "c1", farmer_id: "f2", contributed_qty: 15 },
  { id: "cm3", cluster_id: "c1", farmer_id: "f3", contributed_qty: 12 },
  { id: "cm4", cluster_id: "c1", farmer_id: "f4", contributed_qty: 13 },
  { id: "cm5", cluster_id: "c1", farmer_id: "f5", contributed_qty: 10 },
  // Soybean Cluster (c2) members - Note f1 is in multiple clusters
  { id: "cm6", cluster_id: "c2", farmer_id: "f1", contributed_qty: 20 },
  { id: "cm7", cluster_id: "c2", farmer_id: "f2", contributed_qty: 25 },
];

export const seedBuyerRequests = [
  // A pending request for the wheat cluster (c1) that passed the gates
  {
    id: "br1",
    cluster_id: "c1",
    buyer_id: "b1",
    requested_qty: 60,
    offered_price: 2350,
    status: "open",
    rejection_reason: null,
    created_at: new Date().toISOString()
  }
];
