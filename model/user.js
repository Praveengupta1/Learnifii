const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: String,
  area: String,
  city: String,
  profile_image_url: String,
  gender: String,
  provider: String,
});

module.exports = User = mongoose.model("user", userSchema);
