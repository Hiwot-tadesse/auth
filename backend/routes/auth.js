// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../utils/db');
const config = require('../config');
const { hashPassword, comparePassword } = require('../utils/password');
const { sanitizeObject, isValidEmail } = require('../utils/sanitize');
const { validateSignup, validateLogin } = require('../middleware/validate');
const { sendWelcomeEmail } = require('../utils/email'); // ✅ Import welcome email utility

const ALLOWED_SIGNUP_FIELDS = ['fullname', 'username', 'email', 'location', 'birthdate'];

// ============================================
// POST /api/auth/signup
// Creates user + sends welcome email + auto-login
// ============================================
router.post('/signup', validateSignup, async (req, res) => {
  try {
    const data = sanitizeObject(req.body, ALLOWED_SIGNUP_FIELDS);
    data.email = data.email.toLowerCase();

    // Check for existing user
    const existing = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [data.username, data.email]
    );
    
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(req.body.password);
    
    // ✅ Insert user with email_verified = true (no verification required)
    const result = await pool.query(
      `INSERT INTO users (fullname, username, email, password, location, birthdate, email_verified)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, fullname, username, email, location, birthdate, created_at, email_verified`,
      [data.fullname, data.username, data.email, hashedPassword, data.location, data.birthdate, true] // ✅ true = verified
    );

    const user = result.rows[0];
    
    // ✅ Send welcome email in background (non-blocking)
    setImmediate(async () => {
      try {
        await sendWelcomeEmail(data.email, data.fullname);
        console.log('✅ Welcome email sent to', data.email);
      } catch (emailErr) {
        console.error('❌ Failed to send welcome email:', emailErr.message);
        // Don't fail signup if email fails - just log it
      }
    });

    // ✅ Generate JWT for immediate login
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    console.log('✅ User signed up:', { id: user.id, email: user.email });
    
    // ✅ Return success WITHOUT requiresVerification (immediate login)
    res.status(201).json({
      message: 'Signup successful! Welcome to myHome.',
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        location: user.location,
        birthdate: user.birthdate,
        email_verified: true // ✅ Already verified
      },
      token // ✅ Auto-login token
      // ❌ NO requiresVerification field
    });

  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// ============================================
// POST /api/auth/login
// Authenticates user (no verification check)
// ============================================
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Search by username OR email
    const result = await pool.query(
      `SELECT id, fullname, username, email, password, location, birthdate, created_at, email_verified
       FROM users 
       WHERE username = $1 OR email = $1`,
      [username.toLowerCase()]
    );
    
    const user = result.rows[0];

    // Generic error (prevent user enumeration)
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // ✅ REMOVE verification check - users can login immediately
    // if (!user.email_verified) {
    //   return res.status(403).json({ error: 'Email not verified...' });
    // }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    console.log('✅ User logged in:', { id: user.id, username: user.username });
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ============================================
// GET /api/auth/verify (for ProtectedRoute)
// ============================================
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Verify user still exists
    const result = await pool.query(
      'SELECT id, username, email, email_verified FROM users WHERE id = $1',
      [decoded.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.status(200).json({ 
      valid: true, 
      user: result.rows[0] 
    });

  } catch (error) {
    console.warn('❌ Token verification failed:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    res.status(500).json({ error: 'Verification failed' });
  }
});



module.exports = router;