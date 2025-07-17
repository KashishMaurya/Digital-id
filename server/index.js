require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend domains (adjust if you change Vercel URL)
const allowedOrigins = [
  "http://localhost:5173",
  "https://care-connect-pi-one.vercel.app",
];

// CORS with preflight and credentials support
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.options("*", cors()); // handle preflight requests

// Parse JSON
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);

// Ping route for uptime monitoring
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Test route
app.get("/", (req, res) => {
  res.send("Digital ID API is running");
});

// MongoDB connection + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
