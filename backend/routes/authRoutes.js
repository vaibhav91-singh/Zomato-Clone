const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { restaurants } = require('../dataStore');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { validateLogin, validateRegister } = require('../middleware/validator');
const { authenticateToken, generateToken } = require('../middleware/authMiddleware');
const { authRateLimiter } = require('../middleware/rateLimiter');

// Initial seed users with pre-hashed passwords (12 rounds)
const users = [];

// Helper seed user loader
const seedUsers = async () => {
  if (users.length === 0) {
    const hashedCustomer = await bcrypt.hash('password123', 12);
    const hashedOwner = await bcrypt.hash('password123', 12);

    users.push(
      {
        id: "usr_1",
        name: "Vaibhav Singh",
        email: "vaibhav.singh@example.com",
        phone: "+91 98765 12345",
        passwordHash: hashedCustomer,
        role: "customer",
        avatarLetter: "V"
      },
      {
        id: "usr_owner1",
        name: "Rajesh Sharma (Owner)",
        email: "owner@punjabidhabha.com",
        phone: "+91 98111 22334",
        passwordHash: hashedOwner,
        role: "restaurant_owner",
        restaurantId: "17",
        avatarLetter: "R"
      }
    );
  }
};

seedUsers();

// Cookie Security Options
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

// POST /api/auth/login (Rate Limited: Max 5 attempts / 15 mins)
router.post('/login', authRateLimiter, validateLogin, asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (user) {
    // Verify password hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid email address or password.', 401);
    }
  } else {
    // Create new account if non-existent for seamless demo experience with 12-round hash
    const hashedPassword = await bcrypt.hash(password, 12);
    const targetRole = role || 'customer';
    
    user = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ') || 'Foodie Member',
      email: email,
      phone: '+91 98765 43210',
      passwordHash: hashedPassword,
      role: targetRole,
      restaurantId: targetRole === 'restaurant_owner' ? (restaurants[0] ? restaurants[0].id : '17') : null,
      avatarLetter: email[0].toUpperCase()
    };
    users.push(user);
  }

  if (role && user.role !== role) {
    user.role = role;
    if (role === 'restaurant_owner' && !user.restaurantId) {
      user.restaurantId = restaurants[0] ? restaurants[0].id : '17';
    }
  }

  // Generate JWT Token & Attach HttpOnly Cookie
  const token = generateToken(user);
  res.cookie('zomato_token', token, getCookieOptions());

  const { passwordHash, ...userSafeData } = user;

  res.json({
    success: true,
    message: "Login successful",
    token,
    user: userSafeData
  });
}));

// POST /api/auth/signup (Rate Limited: Max 5 attempts / 15 mins)
router.post('/signup', authRateLimiter, validateRegister, asyncHandler(async (req, res) => {
  const { name, email, phone, password, role, restaurantName, cuisines } = req.body;

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new AppError("User already exists with this email address.", 400);
  }

  // Hash password securely with 12 salt rounds
  const hashedPassword = await bcrypt.hash(password, 12);

  const targetRole = role || 'customer';
  let createdRestaurantId = null;

  if (targetRole === 'restaurant_owner') {
    const newRes = {
      id: `res_${Date.now()}`,
      name: restaurantName || `${name}'s Kitchen`,
      rating: 4.8,
      ratingCount: 12,
      deliveryTime: 25,
      deliveryFee: 20,
      costForTwo: 450,
      cuisines: cuisines ? cuisines.split(',').map(c => c.trim()) : ['North Indian', 'Fast Food'],
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      address: 'Sector 29, Main Market, Gurugram',
      featured: true,
      offers: [],
      categories: [
        {
          name: 'Recommended Specials',
          items: [
            {
              id: `item_${Date.now()}_1`,
              name: 'Special Chef Thali',
              price: 260,
              description: 'Authentic 4-course royal meal served hot with ghee butter naan.',
              isVeg: true,
              imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80',
              category: 'Recommended Specials'
            }
          ]
        }
      ]
    };

    restaurants.unshift(newRes);
    createdRestaurantId = newRes.id;
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email,
    phone: phone || '+91 98765 43210',
    passwordHash: hashedPassword,
    role: targetRole,
    restaurantId: createdRestaurantId,
    avatarLetter: name[0].toUpperCase()
  };

  users.push(newUser);

  // Generate JWT Token & Set HttpOnly Cookie
  const token = generateToken(newUser);
  res.cookie('zomato_token', token, getCookieOptions());

  const { passwordHash, ...userSafeData } = newUser;

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: userSafeData
  });
}));

// GET /api/auth/me - Validate session & return current user info
router.get('/me', authenticateToken, asyncHandler(async (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    throw new AppError('User session not found.', 404);
  }

  const { passwordHash, ...userSafeData } = user;
  res.json({
    success: true,
    user: userSafeData
  });
}));

// POST /api/auth/logout - Clear HttpOnly auth cookie
router.post('/logout', asyncHandler(async (req, res) => {
  res.clearCookie('zomato_token', getCookieOptions());
  res.json({
    success: true,
    message: "Logged out successfully"
  });
}));

module.exports = router;
