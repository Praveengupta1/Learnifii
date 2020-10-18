const Reply_Comment = require("express").Router();
const Item = require("../../model/Item");
const tokenverify = require("../../config/token");
const jwt = require("jsonwebtoken");

Reply_Comment.post("/", tokenverify, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authdata) => {
    if (err) res.json({ message: "unauth", error: err });
    else {
      Item.updateOne(
        {
          _id: req.body.id,
        },
        {
          $push: {
            "posts.$[post].comments.$[comment].replies": {
              $each: [
                {
                  time: new Date().toString(),
                  content: req.body.content,
                  userId: authdata.userdata.email,
                  userName: authdata.userdata.name,
                  userPhoto: authdata.userdata.profile_image_url,
                },
              ],
            },
          },
        },
        {
          arrayFilters: [
            {
              "post._id": {
                $eq: req.body.postId,
              },
            },
            {
              "comment._id": {
                $eq: req.body.commentId,
              },
            },
          ],
        }
      )
        .then((response) =>
          res.json({ res: response, message: "data is push" })
        )
        .catch((e) => res.json({ error: e, message: "any error with api" }));
    }
  });
});

module.exports = Reply_Comment;
