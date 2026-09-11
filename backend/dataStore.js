/**
 * Master DataStore with Thread-Safe Concurrency & Persistent File Store
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data_store_persistence');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const OFFERS_FILE = path.join(DATA_DIR, 'offers.json');

// Ensure storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Category Imports
const northIndianItems = require('./data/northIndian');
const asianItems = require('./data/asian');
const italianItems = require('./data/italian');
const fastFoodItems = require('./data/fastFood');
const dessertItems = require('./data/desserts');
const southIndianItems = require('./data/southIndian');
const healthyItems = require('./data/healthy');
const streetFoodItems = require('./data/streetFood');
const biryaniItems = require('./data/biryani');
const mexicanItems = require('./data/mexican');
const japaneseItems = require('./data/japanese');
const beveragesItems = require('./data/beverages');
const seafoodItems = require('./data/seafood');
const middleEasternItems = require('./data/middleEastern');
const breakfastItems = require('./data/breakfast');
const dinnerExperiencesItems = require('./data/dinnerExperiences');
const weatherSpecialItems = require('./data/weatherSpecials');

// Master Initial Restaurants State
const restaurants = [
  {
    id: "17",
    name: "Rainy & Monsoon Craving Junction",
    cuisines: ["Weather Specials", "Comfort Food", "Samosa & Chai", "Street Food"],
    rating: 4.9,
    ratingCount: 1840,
    deliveryTime: 18,
    deliveryFee: 15,
    costForTwo: 350,
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    address: "Chai Chowk, Sector 14, Noida",
    phone: "+91 98765 43226",
    featured: true,
    offers: [
      {
        id: "off_101",
        code: "MONSOON50",
        title: "50% OFF up to ₹100",
        discountPercent: 50,
        maxDiscount: 100,
        minOrder: 199,
        tagline: "Special Rainy Season Deal! Get 50% OFF on hot monsoon snacks.",
        expiry: "2026-10-31",
        active: true
      },
      {
        id: "off_102",
        code: "FREECHAI",
        title: "Free Masala Chai on orders above ₹299",
        discountPercent: 100,
        maxDiscount: 60,
        minOrder: 299,
        tagline: "Free Hot Kulhad Masala Chai with your order!",
        expiry: "2026-11-15",
        active: true
      }
    ],
    categories: [
      { name: "⛈️ Weather Special Comfort Food", items: weatherSpecialItems }
    ]
  },
  {
    id: "16",
    name: "The Celebration Club & Dinner Lounge",
    cuisines: ["Dinner & Celebrations", "Candlelight Dinner", "Party Combos", "Fine Dining"],
    rating: 4.9,
    ratingCount: 1580,
    deliveryTime: 35,
    deliveryFee: 0,
    costForTwo: 1200,
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    address: "Rooftop 5th Floor, Horizon Tower, Golf Course Road, Gurugram",
    phone: "+91 98765 43225",
    featured: true,
    offers: [],
    categories: [
      { name: "🕯️ Celebration & Dinner Experiences", items: dinnerExperiencesItems }
    ]
  },
  {
    id: "1",
    name: "Spice Symphony",
    cuisines: ["North Indian", "Mughlai", "Tandoori", "Dinner & Celebrations"],
    rating: 4.8,
    ratingCount: 1250,
    deliveryTime: 25,
    deliveryFee: 30,
    costForTwo: 600,
    imageUrl: "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?auto=format&fit=crop&w=800&q=80",
    address: "Metro Plaza, Sector 15, Gurugram",
    phone: "+91 98765 43210",
    featured: true,
    offers: [],
    categories: [
      { name: "North Indian & Tandoori", items: northIndianItems },
      { name: "🕯️ Celebration Dinner Packages", items: dinnerExperiencesItems }
    ]
  },
  {
    id: "2",
    name: "Noodle Ninja",
    cuisines: ["Chinese", "Asian Wok", "Thai"],
    rating: 4.6,
    ratingCount: 920,
    deliveryTime: 20,
    deliveryFee: 40,
    costForTwo: 500,
    imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    address: "Food Capital Court, Galleria, Noida",
    phone: "+91 98765 43211",
    featured: false,
    offers: [],
    categories: [{ name: "Chinese & Asian Wok", items: asianItems }]
  },
  {
    id: "3",
    name: "Piazza Paradiso",
    cuisines: ["Italian", "Pizza", "Pasta"],
    rating: 4.7,
    ratingCount: 1100,
    deliveryTime: 30,
    deliveryFee: 45,
    costForTwo: 800,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    address: "Upper Ground Floor, High Street Mall, South Delhi",
    phone: "+91 98765 43212",
    featured: true,
    offers: [],
    categories: [{ name: "Italian & Pizza / Pasta", items: italianItems }]
  },
  {
    id: "4",
    name: "Burger & Co.",
    cuisines: ["Fast Food", "Burgers", "Sides"],
    rating: 4.6,
    ratingCount: 840,
    deliveryTime: 18,
    deliveryFee: 25,
    costForTwo: 450,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    address: "Shop 12, Nirvana Courtyard, Gurugram",
    phone: "+91 98765 43213",
    featured: false,
    offers: [],
    categories: [{ name: "Fast Food & Gourmet Burgers", items: fastFoodItems }]
  },
  {
    id: "5",
    name: "Sweet Retreat",
    cuisines: ["Desserts", "Bakery", "Cakes"],
    rating: 4.9,
    ratingCount: 610,
    deliveryTime: 15,
    deliveryFee: 20,
    costForTwo: 350,
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    address: "Ring Road Market, Lajpat Nagar, New Delhi",
    phone: "+91 98765 43214",
    featured: true,
    offers: [],
    categories: [{ name: "Desserts & Bakery", items: dessertItems }]
  },
  {
    id: "6",
    name: "Dakshin Express",
    cuisines: ["South Indian", "Dosa", "Idli"],
    rating: 4.8,
    ratingCount: 790,
    deliveryTime: 22,
    deliveryFee: 30,
    costForTwo: 400,
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    address: "Food Court 3, DLF CyberHub, Gurugram",
    phone: "+91 98765 43215",
    featured: true,
    offers: [],
    categories: [{ name: "South Indian Delights", items: southIndianItems }]
  },
  {
    id: "7",
    name: "Green Garden Bowls",
    cuisines: ["Healthy Bowls", "Salads", "Organic"],
    rating: 4.7,
    ratingCount: 520,
    deliveryTime: 20,
    deliveryFee: 25,
    costForTwo: 550,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    address: "Sector 29 Market, Gurugram",
    phone: "+91 98765 43216",
    featured: false,
    offers: [],
    categories: [{ name: "Healthy Bowls & Salads", items: healthyItems }]
  },
  {
    id: "8",
    name: "Chaat Chowk",
    cuisines: ["Street Food", "Chaat", "Pav Bhaji", "Weather Specials"],
    rating: 4.6,
    ratingCount: 680,
    deliveryTime: 16,
    deliveryFee: 20,
    costForTwo: 300,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80",
    address: "Connaught Place Block B, New Delhi",
    phone: "+91 98765 43217",
    featured: true,
    offers: [],
    categories: [
      { name: "Street Food & Chaat", items: streetFoodItems },
      { name: "⛈️ Weather Special Hot Snacks", items: weatherSpecialItems }
    ]
  },
  {
    id: "9",
    name: "Biryani Darbar",
    cuisines: ["Biryani", "Kebabs", "Awadhi"],
    rating: 4.9,
    ratingCount: 1450,
    deliveryTime: 28,
    deliveryFee: 35,
    costForTwo: 650,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    address: "Babar Road, Mandi House, New Delhi",
    phone: "+91 98765 43218",
    featured: true,
    offers: [],
    categories: [{ name: "Biryani & Kebabs", items: biryaniItems }]
  },
  {
    id: "10",
    name: "Taco Habanero",
    cuisines: ["Mexican", "Tacos", "Burritos"],
    rating: 4.5,
    ratingCount: 610,
    deliveryTime: 24,
    deliveryFee: 40,
    costForTwo: 550,
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
    address: "Galleria Market, Sector 28, Gurugram",
    phone: "+91 98765 43219",
    featured: false,
    offers: [],
    categories: [{ name: "Mexican & Tacos", items: mexicanItems }]
  },
  {
    id: "11",
    name: "Tokyo Sushi Bar",
    cuisines: ["Japanese", "Sushi", "Ramen"],
    rating: 4.8,
    ratingCount: 980,
    deliveryTime: 32,
    deliveryFee: 50,
    costForTwo: 950,
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    address: "Horizon Plaza, Cyber City, Gurugram",
    phone: "+91 98765 43220",
    featured: true,
    offers: [],
    categories: [{ name: "Japanese & Sushi", items: japaneseItems }]
  },
  {
    id: "12",
    name: "Sip & Shake Lounge",
    cuisines: ["Beverages", "Shakes", "Cold Brew"],
    rating: 4.7,
    ratingCount: 470,
    deliveryTime: 15,
    deliveryFee: 15,
    costForTwo: 300,
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
    address: "Greater Kailash 1, M-Block, New Delhi",
    phone: "+91 98765 43221",
    featured: false,
    offers: [],
    categories: [{ name: "Beverages & Shakes", items: beveragesItems }]
  },
  {
    id: "13",
    name: "Ocean Catch Seafood",
    cuisines: ["Seafood", "Prawns", "Fish"],
    rating: 4.8,
    ratingCount: 730,
    deliveryTime: 30,
    deliveryFee: 45,
    costForTwo: 900,
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
    address: "Vasant Kunj Promenade, New Delhi",
    phone: "+91 98765 43222",
    featured: true,
    offers: [],
    categories: [{ name: "Seafood Specialties", items: seafoodItems }]
  },
  {
    id: "14",
    name: "Sultan Levant Shawarma",
    cuisines: ["Middle Eastern", "Shawarma", "Kebabs"],
    rating: 4.7,
    ratingCount: 890,
    deliveryTime: 22,
    deliveryFee: 30,
    costForTwo: 480,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
    address: "Cyber Hub Ground Floor, Gurugram",
    phone: "+91 98765 43223",
    featured: true,
    offers: [],
    categories: [{ name: "Middle Eastern & Shawarma", items: middleEasternItems }]
  },
  {
    id: "15",
    name: "Morning Glory Breakfast",
    cuisines: ["Breakfast", "Waffles", "Pancakes"],
    rating: 4.8,
    ratingCount: 650,
    deliveryTime: 20,
    deliveryFee: 25,
    costForTwo: 450,
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    address: "Khan Market, New Delhi",
    phone: "+91 98765 43224",
    featured: true,
    offers: [],
    categories: [{ name: "Breakfast & Waffles", items: breakfastItems }]
  }
];

const reviews = [
  {
    id: "r1",
    restaurantId: "1",
    userName: "Vaibhav S.",
    rating: 5,
    comment: "The Dal Makhani is hands down the best I have ever had! The butter chicken had the perfect texture and hit all the right spots.",
    date: "2026-05-28"
  },
  {
    id: "r2",
    restaurantId: "9",
    userName: "Ananya M.",
    rating: 5,
    comment: "The Mutton Dum Biryani from Biryani Darbar is out of this world! Perfect saffron aroma.",
    date: "2026-05-30"
  }
];

// Persistent State Holders
let orders = [];

// Load persisted orders on startup if exists
try {
  if (fs.existsSync(ORDERS_FILE)) {
    const rawData = fs.readFileSync(ORDERS_FILE, 'utf8');
    orders = JSON.parse(rawData);
  }
} catch (err) {
  console.error('[DATASTORE] Error reading persisted orders:', err.message);
  orders = [];
}

// Async Lock Queue for Safe Disk Serialization
let lockPromise = Promise.resolve();

const queueWrite = (filePath, data) => {
  lockPromise = lockPromise
    .then(() => fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8'))
    .catch((err) => console.error(`[DATASTORE WRITE ERROR] ${filePath}:`, err.message));
  return lockPromise;
};

// Thread-safe Store Methods
const getRestaurants = () => JSON.parse(JSON.stringify(restaurants));

const getRestaurantById = (id) => {
  const rest = restaurants.find(r => r.id === String(id));
  return rest ? JSON.parse(JSON.stringify(rest)) : null;
};

const getOrders = () => JSON.parse(JSON.stringify(orders));

const getOrderById = (orderId) => {
  const order = orders.find(o => o.id === orderId || o.orderId === orderId);
  return order ? JSON.parse(JSON.stringify(order)) : null;
};

const saveOrder = async (orderData) => {
  const newOrder = {
    id: `ORD_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    orderId: `ZOM_${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString(),
    status: 'PLACED',
    ...orderData
  };
  orders.unshift(newOrder);
  await queueWrite(ORDERS_FILE, orders);
  return JSON.parse(JSON.stringify(newOrder));
};

const addRestaurantOffer = async (restaurantId, offerData) => {
  const restIndex = restaurants.findIndex(r => r.id === String(restaurantId));
  if (restIndex === -1) return null;

  if (!restaurants[restIndex].offers) {
    restaurants[restIndex].offers = [];
  }

  const newOffer = {
    id: `off_${Date.now()}`,
    active: true,
    expiry: '2026-12-31',
    ...offerData
  };

  restaurants[restIndex].offers.unshift(newOffer);
  return JSON.parse(JSON.stringify(newOffer));
};

const deleteRestaurantOffer = async (restaurantId, offerId) => {
  const rest = restaurants.find(r => r.id === String(restaurantId));
  if (!rest || !rest.offers) return false;

  const initialLen = rest.offers.length;
  rest.offers = rest.offers.filter(o => o.id !== String(offerId));
  return rest.offers.length < initialLen;
};

module.exports = {
  restaurants,
  reviews,
  orders,
  getRestaurants,
  getRestaurantById,
  getOrders,
  getOrderById,
  saveOrder,
  addRestaurantOffer,
  deleteRestaurantOffer
};
