const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  phone_number: String,
  area: String,
  city: String,
  profile_image_url: String,
});

module.exports = User = mongoose.model("user", userSchema);
