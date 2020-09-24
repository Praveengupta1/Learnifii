const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../config/token");

const User = require("../../model/user");

router.post("/", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email.trim() })
    .then((userdata) => {
      console.log(userdata);
      if (userdata) {
        jwt.sign({ userdata }, "secretkey", (err, token) => {
          res.json({
            token: token,
            user: userdata,
          });
        });
      } else {
        const user = new User({
          name: data.name.toLowerCase(),
          email: data.email,
          phone_number: data.phone_number,
          area: data.area,
          city: data.city,
          profile_image_url: data.profile_image_url,
        });

        user.save();

        res.json({ token: token, user: user });
      }
    })
    .catch((err) => console.log("er" + err));
});

router.post("/verify", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authdata) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authdata,
      });
    }
  });
});

module.exports = router;
