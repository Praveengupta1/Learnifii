const Follow = require("express").Router();
const verifytoken = require("../../config/token");
const jwt = require("jsonwebtoken");
const Item = require("../../model/Item");

Follow.post("/", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authdata) => {
    if (err) {
      res.json({ status: 403, auth: "unauth" });
    } else {
      try {
        Item.findOne({
          _id: req.body.id,
          "followers.userId": authdata.userdata.email.toLowerCase(),
        })
          .then((response) => {
            console.log(response);
            !response
              ? Item.updateOne(
                  { _id: req.body.id },
                  {
                    $push: {
                      followers: {
                        userId: authdata.userdata.email.toLowerCase(),
                        userName: authdata.userdata.name.toLowerCase(),
                        userPhoto: authdata.userdata.profile_image_url,
                      },
                    },
                  },
                  (err, data) => {
                    !err ? res.json(data) : res.status(403).json(err);
                  }
                )
              : Item.updateOne(
                  { _id: req.body.id },
                  {
                    $pull: {
                      followers: {
                        userId: authdata.userdata.email.toLowerCase(),
                      },
                    },
                  },
                  { multi: true },
                  (err, data) =>
                    !err
                      ? res.status(200).json(data)
                      : res.status(403).json(err)
                );
          })
          .catch((err) =>
            res.json({ error: err, message: "any error with follow api" })
          );
      } catch (e) {
        res.json({ error: e, message: "I can't update follow api" });
      }
    }
  });
});

module.exports = Follow;
