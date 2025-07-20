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
    connectionURI: "https://try.supertokens.com", // replace for production
  },
  appInfo: {
    appName: "CareConnect",
    apiDomain: "https://care-connect-iq7u.onrender.com",
    apiBasePath: "/auth",
    websiteDomain: "care-connect-pi-one.vercel.app",
    websiteBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://care-connect-pi-one.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["content-type", ...getAllCORSHeaders()],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(middleware()); // SuperTokens middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profiles", require("./routes/profileRoutes"));

app.get("/", (req, res) => {
  res.send("🚀 Digital ID API is running");
});

app.use(errorHandler()); // SuperTokens error handler

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
  });
