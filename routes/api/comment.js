const Comment = require("express").Router();
const verifytoken = require("../../config/token");
const jwt = require("jsonwebtoken");
const Item = require("../../model/Item");

Comment.post("/", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authdata) => {
    if (err) res.json({ error: err, message: "unauth" });
    try {
      Item.updateOne(
        { "groupPost._id": req.body.id },
        {
          $push: {
            "groupPost.$.comments": {
              $each: [
                {
                  userId: authdata.userdata.email,
                  userName: authdata.userdata.name,
                  userPhoto: authdata.userdata.profile_image_url,
                  comment: req.body.comment,
                },
              ],
              $position: 0,
            },
          },
        }
      )
        .then((response) =>
          res.json({ data: response, message: "response success" })
        )
        .catch((err) => res.json({ error: err, message: "response failed" }));
    } catch (e) {
      res.json({ error: e, message: "any error with api" });
    }
  });
});

module.exports = Comment;
