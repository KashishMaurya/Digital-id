require("dotenv").config();
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

// Middleware to check token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

router.post("/", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
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

    const customFields = JSON.parse(req.body.customFields || "[]");

    const profile = new Profile({
      userId: req.user.id,
      name,
      age,
      gender,
      address,
      phone,
      message,
      photo: req.file?.filename,
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
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


router.get("/user", authMiddleware, async (req, res) => {
  try {
    console.log("User decoded from token:", req.user); // Log user
    const profiles = await Profile.find({ userId: req.user.id });
    console.log("Profiles found:", profiles.length);
    res.json(profiles);
  } catch (err) {
    console.error("Error in GET /api/profiles/user:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

  
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const profiles = await Profile.find({ userId: req.user.id });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: "Not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});



router.put("/:id", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const profileId = req.params.id;
    const userId = req.user.id;

    const existing = await Profile.findOne({ _id: profileId, userId });
    if (!existing) return res.status(404).json({ msg: "Profile not found" });

    const updates = {
      ...req.body,
      customFields: req.body.customFields
        ? JSON.parse(req.body.customFields)
        : [],
    };

    if (req.file) {
      updates.photo = req.file.filename;
    }

    await Profile.findByIdAndUpdate(profileId, updates, { new: true });
    res.json({ msg: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});



router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // ensure it's the user's own profile
    });

    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    res.json({ msg: "Profile deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});



router.delete("/user/all", authMiddleware, async (req, res) => {
  try {
    await Profile.deleteMany({ userId: req.user.id });
    res.json({ msg: "All profiles deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

  

module.exports = router;
