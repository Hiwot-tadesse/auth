// middleware/validate.js
const { isValidEmail } = require('../utils/sanitize');
const { validatePassword } = require('../utils/password');

// Validate required fields exist
const requireFields = (...fields) => {
  return (req, res, next) => {
    const missing = fields.filter(field => !req.body[field]);
    
    if (missing.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        fields: missing 
      });
    }
    next();
  };
};

// Validate signup input
const validateSignup = (req, res, next) => {
  const { fullname, username, email, password } = req.body;
  
  if (!fullname || !username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return res.status(400).json({ 
      error: 'Password too weak', 
      requirements: passwordValidation.errors 
    });
  }
  
  next();
};

// Validate login input
const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  next();
};

module.exports = {
  requireFields,
  validateSignup,
  validateLogin
};