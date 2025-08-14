/**
 * Validation middleware using Joi
 */

function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context.value
      }));
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }
    
    // Replace req.body with validated data
    req.body = value;
    next();
  };
}

/**
 * Error handling middleware
 */
function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  
  // Handle different types of errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: err.message
    });
  }
  
  if (err.name === 'OpenAIError') {
    return res.status(503).json({
      success: false,
      error: 'AI Service Unavailable',
      message: 'The AI service is currently unavailable. Please try again later.'
    });
  }
  
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      error: 'Service Unavailable',
      message: 'External service connection failed'
    });
  }
  
  // Default error
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message
  });
}

/**
 * Request logging middleware
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  const { method, url, ip } = req;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    console.log(`${new Date().toISOString()} - ${method} ${url} - ${statusCode} - ${duration}ms - ${ip}`);
  });
  
  next();
}

/**
 * Rate limiting middleware (simple implementation)
 */
function rateLimit(options = {}) {
  const { windowMs = 15 * 60 * 1000, max = 100 } = options;
  const requests = new Map();
  
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    if (requests.has(key)) {
      const userRequests = requests.get(key).filter(time => time > windowStart);
      requests.set(key, userRequests);
    } else {
      requests.set(key, []);
    }
    
    const userRequests = requests.get(key);
    
    if (userRequests.length >= max) {
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
    
    userRequests.push(now);
    next();
  };
}

/**
 * CORS configuration
 */
function configureCORS() {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    process.env.CORS_ORIGIN
  ].filter(Boolean);
  
  return {
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  };
}

module.exports = {
  validateRequest,
  errorHandler,
  requestLogger,
  rateLimit,
  configureCORS
};
