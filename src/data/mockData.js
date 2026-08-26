export const mockFarmerData = {
  name: "Sarthak-Arote",
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
  currentMandiPrice: "₹5,420",
  groupQuantity: "18.5",
  activeBuyerOffers: 4,
  recommendationScore: 92,
};

export const mockMandiPrices = [
  { id: 1, crop: "Soybean", market: "Nashik", price: "₹5,420", change: "+4.2%", changeType: "up" },
  { id: 2, crop: "Soybean", market: "Lasalgaon", price: "₹5,280", change: "+2.1%", changeType: "up" },
  { id: 3, crop: "Soybean", market: "Pune", price: "₹5,510", change: "+5.3%", changeType: "up" },
  { id: 4, crop: "Wheat", market: "Nashik", price: "₹2,250", change: "-1.2%", changeType: "down" },
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
