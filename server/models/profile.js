const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    age: String,
    gender: String,
    address: String,
    phone: String,
    message: String,
    photo: String, // saved filename
    bloodGroup: String,
    medical: String,
    allergies: String,
    emergencyName: String,
    emergencyPhone: String,
    breed: String,
    chipId: String,
    customFields: [{ label: String, value: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
