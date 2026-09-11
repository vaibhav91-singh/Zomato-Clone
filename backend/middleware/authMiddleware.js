const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');

const JWT_SECRET = process.env.JWT_SECRET || 'zomato_enterprise_jwt_secret_2026_key';

/**
 * Verify JWT token from HttpOnly cookie or Authorization Bearer header
 */
const authenticateToken = (req, res, next) => {
  let token = req.cookies?.zomato_token;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Unauthorized access. Please log in.', 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired authentication session. Please log in again.', 401));
  }
};

/**
 * Sign JWT token for user
 */
const generateToken = (userPayload) => {
  return jwt.sign(
    {
      id: userPayload.id,
      email: userPayload.email,
      role: userPayload.role,
      name: userPayload.name,
      restaurantId: userPayload.restaurantId
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = {
  authenticateToken,
  generateToken,
  JWT_SECRET
};
