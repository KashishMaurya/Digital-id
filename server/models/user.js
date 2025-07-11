// Mongoose user schema

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);



// kashishsocial18;
// Ez6CrF77xEszJblj;
// mongodb+srv://kashishsocial18:Ez6CrF77xEszJblj@cluster0.5avrf4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0