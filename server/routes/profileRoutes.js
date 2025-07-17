require("dotenv").config();
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Profile = require("../models/profileID");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

// Auth middleware
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

// POST: Create Profile
router.post("/", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      type,
      condition,
      medications,
      address,
      phone,
      message,
      bloodGroup,
      medical,
      allergies,
      emergencyName,
      emergencyPhone,
      breed,
      chipId,
    } = req.body;

    if (!name || !age || !phone || !address || !emergencyPhone) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    let customFields = [];
    try {
      customFields = JSON.parse(req.body.customFields || "[]");
    } catch {
      return res.status(400).json({ msg: "Invalid customFields format" });
    }

    const photoUrl = req.file?.path || "";

    const profile = new Profile({
      userId: req.user.id,
      name,
      age,
      gender,
      type,
      condition,
      medications,
      address,
      phone,
      message,
      photoUrl,
      bloodGroup,
      medical,
      allergies,
      emergencyName,
      emergencyPhone,
      breed,
      chipId,
      customFields,
    });

    await profile.save();
    res.json({ msg: "Profile created successfully", profile });
  } catch (err) {
    console.error("POST /api/profiles error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET: All Profiles for Current User
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const profiles = await Profile.find({ userId: req.user.id });
    res.json(profiles);
  } catch (err) {
    console.error("GET /user error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE: All Profiles for User
router.delete("/user/all", authMiddleware, async (req, res) => {
  try {
    await Profile.deleteMany({ userId: req.user.id });
    res.json({ msg: "All profiles deleted" });
  } catch (err) {
    console.error("DELETE /user/all error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET: Single Profile (Public View)
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: "Not found" });
    res.json(profile);
  } catch (err) {
    console.error("GET /:id error:", err.message);
    res.status(500).json({ msg: "Error" });
  }
});

// PUT: Update Profile
router.put("/:id", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const profileId = req.params.id;
    const userId = req.user.id;

    const existing = await Profile.findOne({ _id: profileId, userId });
    if (!existing) return res.status(404).json({ msg: "Profile not found" });

    let updates = { ...req.body };

    try {
      updates.customFields = req.body.customFields
        ? JSON.parse(req.body.customFields)
        : [];
    } catch {
      return res.status(400).json({ msg: "Invalid customFields format" });
    }

    if (req.file) {
      updates.photoUrl = req.file.path;
    }

    const updatedProfile = await Profile.findByIdAndUpdate(profileId, updates, {
      new: true,
    });

    res.json({ msg: "Profile updated successfully", profile: updatedProfile });
  } catch (err) {
    console.error("PUT /:id error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE: One Profile
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    res.json({ msg: "Profile deleted successfully" });
  } catch (err) {
    console.error("DELETE /:id error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
