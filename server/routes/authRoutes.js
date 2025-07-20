const express = require("express");
const router = express.Router();
const {
  verifySession,
} = require("supertokens-node/recipe/session/framework/express");

const User = require("../models/headUser");
const Profile = require("../models/profileID");

// DELETE user account and related profiles
router.delete("/delete", verifySession(), async (req, res) => {
  try {
    const userId = req.session.getUserId(); // from SuperTokens

    await Profile.deleteMany({ userId });
    await User.findByIdAndDelete(userId); // assumes SuperTokens UUID is used as _id

    res.json({ msg: "User account and all profiles deleted" });
  } catch (err) {
    console.error(" Delete user error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
