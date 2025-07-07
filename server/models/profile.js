const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  photo: String,
  message: String,
  customFields: [{ label: String, value: String }],
});

module.exports = mongoose.model("Profile", profileSchema);
