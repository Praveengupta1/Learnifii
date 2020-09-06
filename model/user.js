const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  phone_number: String,
  area: { type: String, trim: true },
  city: { type: String, trim: true },
  profile_image_url: String,
});

module.exports = User = mongoose.model("user", userSchema);
