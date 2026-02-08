const cloudinary = require("cloudinary").v2;
require('dotenv').config();

// Configure Cloudinary - using environment variables for security
// Falls back to hardcoded values for development if env vars not set
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dxqirkx5m",
  api_key: process.env.CLOUDINARY_API_KEY || "839181327468946",
  api_secret: process.env.CLOUDINARY_API_SECRET || "Ifw55BajFeuxa1LqNTVqIy30BRU",
});

module.exports = cloudinary;
