//routing

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const User = require("../models/headUser");
const Profile = require("../models/Profile");

//  Import the auth middleware
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

//  Define the middleware inline here or import it from a separate file
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Delete User + All Profiles
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    await Profile.deleteMany({ userId }); // delete profiles
    await User.findByIdAndDelete(userId); // delete user

    res.json({ msg: "User account and all profiles deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
