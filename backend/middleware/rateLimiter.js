const rateLimit = require('express-rate-limit');

/**
 * Strict Rate Limiter for Login & Signup (Max 5 attempts / 15 minutes per IP)
 */
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many authentication attempts from this IP address. Please try again after 15 minutes.',
    error: 'TooManyRequests'
  }
});

/**
 * General API Rate Limiter (Max 200 requests / 15 minutes per IP)
 */
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: 'API rate limit exceeded. Please slow down your requests.',
    error: 'TooManyRequests'
  }
});

module.exports = {
  authRateLimiter,
  apiRateLimiter
};
