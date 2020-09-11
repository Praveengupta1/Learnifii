const Like = require("express").Router();
const verifytoken = require("../../config/token");
const jwt = require("jsonwebtoken");

Like.post("/", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authdata) => {
    if (err) {
      res.statusCode(403).josn({ error: err, message: "unauth" });
    } else {
      try {
        Item.findOne({
          "posts._id": req.body.id,
        })
          .then((response) => {
            const data = response.posts.filter(
              (post) => post._id == req.body.id
            );
            const isLiked = data[0].likes.filter(
              (like) => like.userId == authdata.userdata.email
            );

            isLiked[0]
              ? Item.updateOne(
                  { "posts._id": req.body.id },
                  {
                    $pull: {
                      "posts.$.likes": {
                        userId: authdata.userdata.email,
                      },
                    },
                  }
                )
                  .then((response) =>
                    res.json({
                      data: response,
                      message: "pull method apply",
                    })
                  )
                  .catch((error) => res.json({ success: false }))
              : Item.updateOne(
                  { "posts._id": req.body.id },
                  {
                    $push: {
                      "posts.$.likes": {
                        $each: [
                          {
                            userId: authdata.userdata.email.toLowerCase(),
                            userName: authdata.userdata.name.toLowerCase(),
                            userPhoto: authdata.userdata.profile_image_url,
                          },
                        ],
                        $position: 0,
                      },
                    },
                  }
                )
                  .then((response) =>
                    res.json({ data: response, message: "push method " })
                  )
                  .catch((error) =>
                    res.json({ error: error, message: "any error with mongo " })
                  );
          })

          .catch((error) =>
            res.json({ error: error, message: "any error with mongo " })
          );
      } catch (e) {
        res.statusCode(403).json({ error: e, message: "any error with db " });
      }
    }
  });
});

module.exports = Like;
