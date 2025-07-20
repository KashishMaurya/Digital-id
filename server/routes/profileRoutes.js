const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const Profile = require("../models/profileID");

const {
  verifySession,
} = require("supertokens-node/recipe/session/framework/express");

// Create Profile
router.post("/", verifySession(), upload.single("photo"), async (req, res) => {
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
    } catch (err) {
      console.error("customFields parse error:", err.message);
      return res.status(400).json({ msg: "Invalid customFields format" });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ msg: "Photo upload failed" });
    }

    const photoUrl = req.file.path;

    const profile = new Profile({
      userId: req.session.getUserId(), // From SuperTokens session
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
    res.status(201).json({ msg: "Profile created successfully", profile });
  } catch (err) {
    console.error("POST /api/profiles error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get all profiles for logged-in user
router.get("/user", verifySession(), async (req, res) => {
  try {
    const userId = req.session.getUserId();
    const profiles = await Profile.find({ userId });
    res.json(profiles);
  } catch (err) {
    console.error("GET /user error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Delete all profiles for user
router.delete("/user/all", verifySession(), async (req, res) => {
  try {
    const userId = req.session.getUserId();
    await Profile.deleteMany({ userId });
    res.json({ msg: "All profiles deleted" });
  } catch (err) {
    console.error("DELETE /user/all error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get one profile (public)
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error("GET /:id error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Update profile
router.put(
  "/:id",
  verifySession(),
  upload.single("photo"),
  async (req, res) => {
    try {
      const profileId = req.params.id;
      const userId = req.session.getUserId();

      const existing = await Profile.findOne({ _id: profileId, userId });
      if (!existing) return res.status(404).json({ msg: "Profile not found" });

      let updates = { ...req.body };

      try {
        updates.customFields = req.body.customFields
          ? JSON.parse(req.body.customFields)
          : [];
      } catch (err) {
        console.error("customFields parse error:", err.message);
        return res.status(400).json({ msg: "Invalid customFields format" });
      }

      if (req.file?.path) {
        updates.photoUrl = req.file.path;
      }

      const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
        updates,
        {
          new: true,
        }
      );

      res.json({
        msg: "Profile updated successfully",
        profile: updatedProfile,
      });
    } catch (err) {
      console.error("PUT /:id error:", err.message);
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  }
);

// Delete one profile
router.delete("/:id", verifySession(), async (req, res) => {
  try {
    const userId = req.session.getUserId();
    const profile = await Profile.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    res.json({ msg: "Profile deleted successfully" });
  } catch (err) {
    console.error("DELETE /:id error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
