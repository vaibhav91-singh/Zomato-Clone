const { AppError } = require('./errorHandler');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate User Registration Payload
 */
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return next(new AppError('Full name must be at least 2 characters long.', 400));
  }

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    return next(new AppError('Please provide a valid email address.', 400));
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return next(new AppError('Password must be at least 6 characters long.', 400));
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  next();
};

/**
 * Validate Login Payload
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    return next(new AppError('Please provide a valid email address.', 400));
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    return next(new AppError('Password is required.', 400));
  }

  req.body.email = email.trim().toLowerCase();
  next();
};

/**
 * Validate Order Creation Payload
 */
const validateOrder = (req, res, next) => {
  let { restaurantId, items, deliveryAddress, paymentMethod } = req.body || {};

  if (!restaurantId && Array.isArray(items) && items.length > 0) {
    restaurantId = items[0]?.restaurantId || '1';
    req.body.restaurantId = restaurantId;
  }

  if (!restaurantId) {
    return next(new AppError('Restaurant ID is required.', 400));
  }

  if (!Array.isArray(items) || items.length === 0) {
    return next(new AppError('Order must contain at least one item.', 400));
  }

  for (const item of items) {
    if (!item.name || typeof item.price !== 'number' || item.price <= 0) {
      return next(new AppError('Each item must have a valid name and positive price.', 400));
    }
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      return next(new AppError('Item quantity must be a positive integer.', 400));
    }
  }

  if (!deliveryAddress || typeof deliveryAddress !== 'string' || deliveryAddress.trim().length < 5) {
    return next(new AppError('Valid delivery address (min 5 characters) is required.', 400));
  }

  next();
};

/**
 * Validate Restaurant Offer Payload
 */
const validateOffer = (req, res, next) => {
  const { title, discountPercent, code } = req.body || {};

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return next(new AppError('Offer title must be at least 3 characters long.', 400));
  }

  if (typeof discountPercent !== 'number' || discountPercent < 1 || discountPercent > 100) {
    return next(new AppError('Discount percentage must be a number between 1 and 100.', 400));
  }

  if (!code || typeof code !== 'string' || code.trim().length < 3) {
    return next(new AppError('Promo code must be at least 3 characters long.', 400));
  }

  req.body.title = title.trim();
  req.body.code = code.trim().toUpperCase();
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateOrder,
  validateOffer
};
