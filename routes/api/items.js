const express = require("express");
const router = express.Router();
// Item Model

const Item = require("../../model/Item");
const { response } = require("express");

// grab all group  and create a group
router
  .get("/group", (req, res) => {
    Item.find()
      .sort({ date: -1 })
      .then((item) => res.json(item));
  })
  // delete group
  .delete("/group", (req, res) => {
    Item.deleteOne({ _id: req.body.id })
      .then((response) => res.json(response))
      .catch((error) => res.json((error) => res.json(error)));
  })
  // create group route
  .post("/group", (req, res) => {
    const item = new Item({
      groupName: req.body.groupName,
    });
    Item.findOne({ groupName: req.body.groupName })
      .then((response) => {
        response
          ? res.json({ massage: "already exists", response })
          : item
              .save()
              .then((response) => res.json(response))
              .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  });

// follow group by user
// follow routes
router
  .put("/followgroup", (req, res) => {
    Item.updateOne(
      { groupName: req.body.groupName },
      {
        $push: {
          followerGroupUser: {
            $each: [{ userName: req.body.userName }],
          },
        },
      },
      { upsert: true }
    )
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  })

  // unfollow routes

  .delete("/followgroup", (req, res) => {
    Item.updateOne(
      { followerGroupUser: { $elemMatch: { _id: req.body.id } } },
      { $pull: { followerGroupUser: { _id: req.body.id } } }
    )
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  });

// write a post
router
  .put("/grouppost", (req, res) => {
    Item.updateOne(
      { _id: req.body.id },
      {
        $push: {
          groupPost: {
            $each: [
              {
                userName: req.body.userName,
                content: req.body.content,
              },
            ],
          },
        },
      },
      { upsert: true }
    )
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  })
  // delete a post
  .delete("/grouppost", (req, res) => {
    Item.updateOne(
      { groupPost: { $elemMatch: { _id: req.body.id } } },
      { $pull: { groupPost: { _id: req.body.id } } }
    )
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  });

// like post routes

router.put("/like", (req, res) => {
  Item.findOne({ "groupPost.like.userName": req.body.userName })
    .then((response) =>
      response
        ? Item.updateOne(
            { "groupPost._id": req.body.id },
            {
              $pull: {
                "groupPost.$.like": { userName: req.body.userName },
              },
            }
          )
            .then((response) => res.json(response))
            .catch((error) => res.json({ success: false }))
        : Item.updateOne(
            { "groupPost._id": req.body.id },
            {
              $push: {
                "groupPost.$.like": {
                  $each: [{ userName: req.body.userName }],
                },
              },
            }
          )
            .then((response) => res.json(response))
            .catch((error) => res.json(error))
    )
    .catch((error) => res.json(error));
});

// incremnet number of share
router.put("/share", (req, res) => {
  Item.updateOne(
    { "groupPost._id": req.body.id },
    { $inc: { "groupPost.$.noumberOfShare": 1 } }
  )
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// make a comment

router.put("/comment", (req, res) => {
  Item.updateOne(
    { "groupPost._id": req.body.id },
    {
      $push: {
        "groupPost.$.commentSection": {
          $each: [{ comment: req.body.comment, userName: req.body.userName }],
        },
      },
    }
  )
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// make a like a comment

router.put("/comment/like", (req, res) => {
  Item.updateOne(
    { "groupPost._id": req.body.id },
    {
      $push: {
        groupPost: {
          "commentSection.$.like": {
            $each: [{ userName: req.body.userName }],
          },
        },
      },
    }
  )
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

module.exports = router;
