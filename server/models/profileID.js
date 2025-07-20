//profile model

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: String,
    type: String,
    condition: String, 
    medications: String, 
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: String,
    photoUrl: {
      type: String,
      required: true,
      default: "",
    },
    bloodGroup: String,
    medical: String, 
    allergies: String,
    emergencyName: String,
    emergencyPhone: {
      type: String,
      required: true,
    },
    breed: String, // for pets
    chipId: String, // for pets
    customFields: [{ label: String, value: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
