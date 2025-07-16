// Logic for handling auth

const User = require("../models/User"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/jwt");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt with:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found for", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is undefined!");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    console.log("Token generated");

    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
