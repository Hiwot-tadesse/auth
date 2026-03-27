// routes/user.js
const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
const { verifyToken } = require('../middleware/auth');
const { sanitizeObject } = require('../utils/sanitize');

const ALLOWED_UPDATE_FIELDS = ['fullname', 'location', 'birthdate'];

// GET /api/user/me - Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, fullname, username, email, location, birthdate, created_at
       FROM users WHERE id = $1`,
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });

  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// PUT /api/user/me - Update user profile
router.put('/me', verifyToken, async (req, res) => {
  try {
    const updates = sanitizeObject(req.body, ALLOWED_UPDATE_FIELDS);
    
    // Build dynamic update query
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const values = [req.user.id, ...Object.values(updates)];
    
    const result = await pool.query(
      `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING id, fullname, username, email, location, birthdate, updated_at`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ 
      message: 'Profile updated successfully',
      user: result.rows[0] 
    });

  } catch (error) {
    console.error('❌ Update user error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;