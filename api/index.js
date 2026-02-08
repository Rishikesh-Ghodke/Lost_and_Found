// Vercel serverless function handler
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB (only once)
if (mongoose.connection.readyState === 0) {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.error("MongoDB connection error:", err));
}

// Create Express app
const app = express();

// CORS Configuration
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require("../server/routes/authRoutes");
const itemRoutes = require("../server/routes/itemRoutes");
const contactRoutes = require("../server/routes/contactRoutes");

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/contact", contactRoutes);

// Test endpoint
app.get("/api/test", (req, res) => {
    res.json({
        status: "✅ Backend API is working!",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        message: "PICT Lost & Found Backend is running successfully on Vercel",
    });
});

// Root endpoint
app.get("/api", (req, res) => {
    res.json({
        message: "🚀 PICT Lost & Found Backend is Live!",
        status: "success",
        timestamp: new Date().toISOString(),
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Export for Vercel
module.exports = app;
