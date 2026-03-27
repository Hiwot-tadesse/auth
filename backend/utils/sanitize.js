// utils/sanitize.js
const validator = require('validator');

// Sanitize a single string input
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return validator.escape(str.trim());
};

// Sanitize an object of inputs
const sanitizeObject = (obj, allowedFields) => {
  const sanitized = {};
  
  for (const field of allowedFields) {
    if (obj[field] !== undefined) {
      sanitized[field] = sanitizeString(obj[field]);
    }
  }
  
  return sanitized;
};

// Validate email format
const isValidEmail = (email) => {
  return validator.isEmail(email || '');
};

module.exports = {
  sanitizeString,
  sanitizeObject,
  isValidEmail
};