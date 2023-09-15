require('dotenv').config();

const {
  RATE_WINDOW = 6000,
  RATE_LIMIT = 100,
} = process.env;

const rateLimiter = require('express-rate-limit');

module.exports = rateLimiter({
  windowMs: RATE_WINDOW,
  max: RATE_LIMIT,
});
