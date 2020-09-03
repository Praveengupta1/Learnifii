const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../config/token");

const User = require("../../model/user");

router.post("/", (req, res) => {
  axios
    .post("https://apilearnifii.herokuapp.com/auth/communitylogin", req.body)
    .then((response) => {
      axios
        .get("https://apilearnifii.herokuapp.com/mycommunityprofile", {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        })
        .then((response) => {
          const data = response.data[0];
          User.findOne({ email: data.email })
            .then((userdata) => {
              if (userdata) {
                jwt.sign(
                  { userdata },
                  "secretkey",
                  { expiresIn: "1d" },
                  (err, token) => {
                    res.json({
                      token: token,
                      user: userdata,
                    });
                  }
                );
              } else {
                const user = new User({
                  name: data.name,
                  email: data.email,
                  phone_number: data.phone_number,
                  area: data.area,
                  city: data.city,
                  profile_image_url: data.profile_image_url,
                });
                user.save();
                res.json({ token: token, user: data });
              }
            })
            .catch((err) => console.log("er" + err));
        });
    })
    .catch((error) => console.log(error));
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
