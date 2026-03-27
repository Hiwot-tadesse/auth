// utils/db.js
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({ 
  connectionString: config.database.url,
  ssl: config.database.ssl
});

// Test connection on startup
pool.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Database connected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});

module.exports = pool;