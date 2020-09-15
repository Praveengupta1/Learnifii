const Like_Comment = require("express").Router();
const Item = require("../../model/Item");
const tokenverify = require("../../config/token");
const jwt = require("jsonwebtoken");

Like_Comment.post("/", tokenverify, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authdata) => {
    if (err) res.json({ message: "unauth", error: err });
    else {
      Item.findOne(
        { _id: req.body.id, "posts._id": req.body.postId },
        { "posts.$.comments": 1 }
      )
        .then((response) => {
          const likes = response.posts[0].comments[0].likes;

          const isLike = likes.filter(
            (like) => like.userId === authdata.userdata.email
          );

          if (isLike[0]) {
            Item.updateOne(
              {
                _id: req.body.id,
              },
              {
                $pull: {
                  "posts.$[post].comments.$[comment].likes": {
                    userId: authdata.userdata.email,
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
                res.json({ res: response, message: "data is pull" })
              )
              .catch((e) =>
                res.json({ error: e, message: "any error with api" })
              );
          } else {
            Item.updateOne(
              {
                _id: req.body.id,
              },
              {
                $push: {
                  "posts.$[post].comments.$[comment].likes": {
                    $each: [
                      {
                        userId: authdata.userdata.email,
                        userName: authdata.userdata.name,
                        userPhoto: authdata.userdata.profile_image_url,
                      },
                    ],
                    $position: 0,
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
              .catch((e) =>
                res.json({ error: e, message: "any error with api" })
              );
          }
        })
        .catch((e) => res.json({ error: e, message: "any error with api" }));
    }
  });
});

module.exports = Like_Comment;
