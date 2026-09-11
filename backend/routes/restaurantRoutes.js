const express = require('express');
const router = express.Router();
const { restaurants, reviews, orders, getRestaurants, getRestaurantById, addRestaurantOffer, deleteRestaurantOffer } = require('../dataStore');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { validateOffer } = require('../middleware/validator');

// GET /api/restaurants/:id/analytics - Get Total Income, AOV, Order Counts, and Top Demand Dishes
router.get('/:id/analytics', asyncHandler(async (req, res) => {
  const { id } = req.params;
  let restaurant = getRestaurantById(id);

  if (!restaurant) {
    restaurant = getRestaurants()[0] || { id: '17', name: 'Partner Restaurant' };
  }

  const restaurantOrders = orders.filter(o => !o.restaurantId || o.restaurantId === id || o.restaurantId === restaurant.id);

  const totalIncome = restaurantOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalOrders = restaurantOrders.length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalIncome / totalOrders) : 0;

  const demandMap = {};
  restaurantOrders.forEach(order => {
    if (Array.isArray(order.items)) {
      order.items.forEach(item => {
        const name = item.name || 'Unknown Dish';
        const qty = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;

        if (!demandMap[name]) {
          demandMap[name] = {
            name,
            totalQuantity: 0,
            totalRevenue: 0,
            isVeg: item.isVeg ?? true,
            imageUrl: item.imageUrl || ''
          };
        }
        demandMap[name].totalQuantity += qty;
        demandMap[name].totalRevenue += price * qty;
      });
    }
  });

  const sortedDishes = Object.values(demandMap).sort((a, b) => b.totalQuantity - a.totalQuantity);
  const maxQty = sortedDishes[0]?.totalQuantity || 1;

  const topDemandDishes = sortedDishes.map((dish, index) => ({
    ...dish,
    rank: index + 1,
    demandPercent: Math.round((dish.totalQuantity / maxQty) * 100)
  }));

  res.json({
    success: true,
    restaurantId: id,
    restaurantName: restaurant.name,
    totalIncome,
    totalOrders,
    averageOrderValue,
    topDemandDishes
  });
}));

// GET /api/restaurants/:id/offers - Get all active promotional offers for a restaurant
router.get('/:id/offers', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restaurant = getRestaurantById(id) || getRestaurants()[0];

  res.json({
    success: true,
    offers: restaurant.offers || []
  });
}));

// POST /api/restaurants/:id/offers - Add a new partner offer/coupon code
router.post('/:id/offers', validateOffer, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newOffer = await addRestaurantOffer(id, req.body);

  if (!newOffer) {
    throw new AppError('Restaurant not found to add offer.', 404);
  }

  const updatedRest = getRestaurantById(id);

  res.status(201).json({
    success: true,
    message: "Offer coupon created successfully!",
    offer: newOffer,
    offers: updatedRest ? updatedRest.offers : []
  });
}));

// DELETE /api/restaurants/:id/offers/:offerId - Delete a partner offer
router.delete('/:id/offers/:offerId', asyncHandler(async (req, res) => {
  const { id, offerId } = req.params;
  const success = await deleteRestaurantOffer(id, offerId);

  if (!success) {
    throw new AppError('Offer not found or already deleted.', 404);
  }

  const updatedRest = getRestaurantById(id);

  res.json({
    success: true,
    message: "Offer deleted successfully!",
    offers: updatedRest ? updatedRest.offers : []
  });
}));

// GET /api/restaurants - GET all restaurants with optional search, rating, and cuisine filters
router.get('/', asyncHandler(async (req, res) => {
  const { search, cuisine, minRating, featured } = req.query;
  let filtered = getRestaurants();

  if (featured === 'true') {
    filtered = filtered.filter(r => r.featured);
  }

  if (minRating) {
    const min = parseFloat(minRating);
    if (!isNaN(min)) {
      filtered = filtered.filter(r => r.rating >= min);
    }
  }

  if (cuisine) {
    filtered = filtered.filter(r => 
      r.cuisines.some(c => c.toLowerCase() === cuisine.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(r => {
      const nameMatch = r.name.toLowerCase().includes(q);
      const cuisineMatch = r.cuisines.some(c => c.toLowerCase().includes(q));
      
      const itemMatch = r.categories.some(cat => 
        cat.items.some(item => 
          item.name.toLowerCase().includes(q) || 
          (item.description && item.description.toLowerCase().includes(q))
        )
      );

      return nameMatch || cuisineMatch || itemMatch;
    });
  }

  const summaryList = filtered.map(r => {
    const allDishes = r.categories ? r.categories.flatMap(cat => cat.items || []) : [];
    return {
      ...r,
      dishes: allDishes
    };
  });

  res.json(summaryList);
}));

// GET /api/restaurants/:id - GET single restaurant details
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restaurant = getRestaurantById(id) || getRestaurants()[0];

  const restaurantReviews = reviews.filter(rev => rev.restaurantId === id);

  res.json({
    ...restaurant,
    reviewsList: restaurantReviews
  });
}));

// POST /api/restaurants/:id/reviews - Add review
router.post('/:id/reviews', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userName, rating, comment } = req.body;

  if (!userName || !rating || !comment) {
    throw new AppError("Missing required fields: userName, rating, comment", 400);
  }

  const numericRating = parseFloat(rating);
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
    throw new AppError("Rating must be a number between 1 and 5", 400);
  }

  const targetRestIndex = restaurants.findIndex(r => r.id === id);
  if (targetRestIndex === -1) {
    throw new AppError("Restaurant not found", 404);
  }

  const newReview = {
    id: `rev_${Date.now()}`,
    restaurantId: id,
    userName,
    rating: numericRating,
    comment,
    date: new Date().toISOString().split('T')[0]
  };

  reviews.unshift(newReview);

  const restaurantReviews = reviews.filter(rev => rev.restaurantId === id);
  const totalRating = restaurantReviews.reduce((sum, r) => sum + r.rating, 0);
  
  restaurants[targetRestIndex].rating = parseFloat((totalRating / restaurantReviews.length).toFixed(1));
  restaurants[targetRestIndex].ratingCount = restaurantReviews.length;

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    review: newReview,
    updatedRating: restaurants[targetRestIndex].rating,
    updatedRatingCount: restaurants[targetRestIndex].ratingCount
  });
}));

// PUT /api/restaurants/:id - Update restaurant partner profile details
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, cuisines, imageUrl, priceForTwo, deliveryTime, address, featured } = req.body;

  const targetRestIndex = restaurants.findIndex(r => r.id === id);
  if (targetRestIndex === -1) {
    throw new AppError("Restaurant not found", 404);
  }

  if (name) restaurants[targetRestIndex].name = name;
  if (cuisines) {
    restaurants[targetRestIndex].cuisines = Array.isArray(cuisines) ? cuisines : cuisines.split(',').map(c => c.trim());
  }
  if (imageUrl) restaurants[targetRestIndex].imageUrl = imageUrl;
  if (priceForTwo) restaurants[targetRestIndex].priceForTwo = parseInt(priceForTwo) || restaurants[targetRestIndex].priceForTwo;
  if (deliveryTime) restaurants[targetRestIndex].deliveryTime = deliveryTime;
  if (address) restaurants[targetRestIndex].address = address;
  if (typeof featured === 'boolean') restaurants[targetRestIndex].featured = featured;

  res.json({
    success: true,
    message: "Restaurant profile updated successfully",
    restaurant: restaurants[targetRestIndex]
  });
}));

// POST /api/restaurants/:id/dishes - Add a new dish item
router.post('/:id/dishes', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, isVeg, imageUrl, category } = req.body;

  if (!name || !price) {
    throw new AppError("Dish name and price are required", 400);
  }

  const targetRestIndex = restaurants.findIndex(r => r.id === id);
  if (targetRestIndex === -1) {
    throw new AppError("Restaurant not found", 404);
  }

  const catName = category || 'Recommended Specials';
  let catObj = restaurants[targetRestIndex].categories.find(c => c.name.toLowerCase() === catName.toLowerCase());

  if (!catObj) {
    catObj = {
      name: catName,
      items: []
    };
    restaurants[targetRestIndex].categories.push(catObj);
  }

  const newDish = {
    id: `item_${Date.now()}`,
    name,
    price: parseFloat(price),
    description: description || 'Prepared fresh by restaurant chef with premium ingredients.',
    isVeg: isVeg !== undefined ? Boolean(isVeg) : true,
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
    category: catName
  };

  catObj.items.unshift(newDish);

  res.status(201).json({
    success: true,
    message: "Dish added successfully",
    dish: newDish,
    restaurant: restaurants[targetRestIndex]
  });
}));

// DELETE /api/restaurants/:id/dishes/:dishId - Delete a dish item
router.delete('/:id/dishes/:dishId', asyncHandler(async (req, res) => {
  const { id, dishId } = req.params;
  const targetRestIndex = restaurants.findIndex(r => r.id === id);

  if (targetRestIndex === -1) {
    throw new AppError("Restaurant not found", 404);
  }

  let deleted = false;
  restaurants[targetRestIndex].categories.forEach(cat => {
    const initialLen = cat.items.length;
    cat.items = cat.items.filter(item => item.id !== dishId);
    if (cat.items.length < initialLen) deleted = true;
  });

  if (!deleted) {
    throw new AppError("Dish item not found", 404);
  }

  res.json({
    success: true,
    message: "Dish deleted successfully",
    restaurant: restaurants[targetRestIndex]
  });
}));

module.exports = router;
