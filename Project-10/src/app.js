const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const hpp = require('hpp');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const { v4: uuidv4 } = require('uuid');

const env = require('./config/environment');
const logger = require('./config/logger');
const swaggerSpec = require('./config/swagger');
const routes = require('./routes');
const { apiLimiter } = require('./middlewares/rateLimiter.middleware');
const { errorHandler, notFound } = require('./middlewares/error.middleware');

const app = express();

// =====================================================
// SECURITY MIDDLEWARE
// =====================================================

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: env.cors.origin === '*' ? '*' : env.cors.origin.split(','),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);

// Prevent HTTP parameter pollution
app.use(hpp());

// Rate limiting
app.use('/api/', apiLimiter);

// =====================================================
// BODY PARSING
// =====================================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =====================================================
// COMPRESSION
// =====================================================

app.use(compression());

// =====================================================
// LOGGING
// =====================================================

// Request ID middleware
app.use((req, res, next) => {
  req.id = uuidv4();
  res.setHeader('X-Request-Id', req.id);
  next();
});

// HTTP request logging
if (env.nodeEnv === 'development') {
  app.use(morgan('dev', { stream: logger.stream }));
} else {
  app.use(
    morgan(
      ':remote-addr :method :url :status :res[content-length] - :response-time ms',
      { stream: logger.stream }
    )
  );
}

// =====================================================
// HEALTH CHECK
// =====================================================

/**
 * @route GET /health
 * @desc Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DVD Rental API is running',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// =====================================================
// API DOCUMENTATION
// =====================================================

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'DVD Rental API Documentation',
}));

// Serve swagger spec as JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// =====================================================
// API ROUTES
// =====================================================

app.use('/api/v1', routes);

// =====================================================
// ERROR HANDLING
// =====================================================

// Handle 404 - Route not found
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
