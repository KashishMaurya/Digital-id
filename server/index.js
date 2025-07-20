require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// SuperTokens setup
const supertokens = require("supertokens-node");
const {
  middleware,
  errorHandler,
} = require("supertokens-node/framework/express");
const { getAllCORSHeaders } = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "https://try.supertokens.com", // Replace in production
  },
  appInfo: {
    appName: "CareConnect",
    apiDomain: "https://care-connect-iq7u.onrender.com", // Backend
    apiBasePath: "/auth",
    websiteDomain: "https://digital-id-three.vercel.app", // Frontend
    websiteBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://digital-id-three.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Request origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["content-type", ...getAllCORSHeaders()],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// Allow preflight requests for SuperTokens endpoints
app.options("/auth/*", cors(corsOptions));

// Apply CORS and session middleware (in correct order)
app.use(cors(corsOptions));
app.use(express.json());
app.use(middleware()); // SuperTokens

// Static assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//custom routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profiles", require("./routes/profileRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Digital ID API is running");
});

// SuperTokens error handler – must be last
app.use(errorHandler());

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
