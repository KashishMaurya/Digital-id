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
    type: String, 
    condition: String, 
    address: String,
    phone: String,
    message: String,
    photo: {
      type: String,
      default: "",
    }, 
    bloodGroup: String,
    medical: String,
    allergies: String,
    emergencyName: String,
    emergencyPhone: String,
    breed: String,
    chipId: String,
    customFields: [{ label: String, value: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
