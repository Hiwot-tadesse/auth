// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// 🔐 Security Middleware
app.use(helmet()); // Security headers
app.use(cors(config.cors)); // CORS policy
app.use(express.json({ limit: '10kb' })); // Body parser with size limit

// 🚦 Rate Limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 🗂️ Route Mounting
app.use('/api/auth', authLimiter, authRoutes); // Auth routes with rate limiting
app.use('/api/user', userRoutes); // User routes (protected by JWT in middleware)

// 🏁 Health Check (for deployments/load balancers)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: config.nodeEnv 
  });
});

// 🎯 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// 🚪 Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  
  // Don't leak error details in production
  const message = config.nodeEnv === 'production' 
    ? 'Internal server error' 
    : err.message;
    
  res.status(err.status || 500).json({ error: message });
});

// 🚀 Start Server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 Frontend allowed: ${config.cors.origin}`);
  console.log(`📦 Environment: ${config.nodeEnv}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Shutting down gracefully...');
  process.exit(0);
});