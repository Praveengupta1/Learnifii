const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../config/token");

const User = require("../../model/user");

router.post("/", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email.toLowerCase().trim() })
    .then((userdata) => {
      console.log("userdata ");
      console.log(userdata);
      if (userdata) {
        jwt.sign({ userdata }, "secretkey", (err, token) => {
          res.json({
            token: token,
            user: userdata,
          });
        });
      } else {
        console.log("userdata 1");
        const user = new User({
          name: req.body.name.toLowerCase(),
          email: req.body.email,
          phone_number: req.body.phone_number,
          area: req.body.area,
          city: req.body.city,
          profile_image_url: req.body.profile_image_url,
        });

        user.save();
        jwt.sign({ userdata }, "secretkey", (err, token) => {
          res.json({ token: token, user: user });
        });
      }
    })
    .catch((err) => console.log("er" + err));
});

module.exports = router;
