const GetPost = require("express").Router();
const jwt = require("jsonwebtoken");
const verifytoken = require("../../config/token");
const Item = require("../../model/Item");

GetPost.get("/:groupId/:postId", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err) => {
    if (err) res.json({ error: err, message: "unauth" });
    try {
      const { groupId, postId } = req.params;
      console.log(req.params);
      Item.find({ _id: groupId, "posts._id": postId }, { "posts.$": 1 })
        .then((response) =>
          res.json({ data: response, message: "one post data" })
        )
        .catch((err) =>
          res.json({ error: err, message: "any error with mongo" })
        );
    } catch (e) {
      res.json({ error: e, message: "any error with mongo" });
    }
  });
});

module.exports = GetPost;
