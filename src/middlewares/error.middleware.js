/**
 * Error Middleware (The Safety Net)
 * This catches all errors from controllers and sends proper JSON responses.
 * It must be added AFTER all other routes in app.js
 */

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Default error status and message
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid ID format';
  }

  if (err.code === 11000) {
    status = 400;
    message = `${Object.keys(err.keyValue)[0]} already exists`;
  }

  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token has expired';
  }

  // Send error response
  res.status(status).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// 404 Not Found Middleware (Should be placed before error handler)
export const notFound = (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Route ${req.originalUrl} not found`
  });
};
