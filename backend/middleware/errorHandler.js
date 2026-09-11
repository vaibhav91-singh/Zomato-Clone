/**
 * Centralized Global Error Handler & 404 Middleware
 */

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Wrapper for async route handlers to eliminate repetitive try-catch blocks
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Unmatched 404 handler
const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Resource not found: ${req.originalUrl}`, 404);
  next(error);
};

// Global Express Error Middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);
  const message = err.message || 'Internal Server Error';

  console.error(`[ERROR] [${new Date().toISOString()}] ${req.method} ${req.originalUrl}:`, {
    message,
    statusCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: err.name || 'Error',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  AppError,
  asyncHandler,
  notFoundHandler,
  errorHandler
};
