require('dotenv').config();

module.exports = {
  // JWT Secret - REQUIRED for login
  jwtSecret: process.env.JWT_SECRET || 'pict-lost-found-secret-key-2024-change-in-production',
  JWT_SECRET: process.env.JWT_SECRET || 'pict-lost-found-secret-key-2024-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  // MongoDB URI (for seed script)
  mongoURI: process.env.MONGO_URI || 'mongodb+srv://rishi:RG8172004@cluster0.u65kq.mongodb.net/pict-lostfound',

  // SMTP Email Configuration (optional - for email notifications)
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: process.env.SMTP_PORT || 587,
  SMTP_EMAIL: process.env.SMTP_EMAIL || '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
  FROM_EMAIL: process.env.FROM_EMAIL || 'noreply@pictlostfound.com',
  FROM_NAME: process.env.FROM_NAME || 'PICT Lost & Found',

  // Guard Credentials (for User model - may not be used)
  GUARD_CREDENTIALS: {
    username: process.env.GUARD_USERNAME || 'pict_guard',
    password: process.env.GUARD_PASSWORD || 'secure@guard123'
  }
};
