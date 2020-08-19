const express = require("express");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
// Item Model

const Item = require("../../model/Item");
// image uploadation
// mongo uri
const mongoURI = require("../../config/key").MongoURI;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init gfs
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
//@GET  for image
router.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if file
    if (file) {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an file",
      });
    }
  });
});

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
      { _id: req.body.id },
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
router.put("/grouppost", upload.single("file"), (req, res) => {
  console.log(req.file);
  if (req.file) {
    Item.updateOne(
      { _id: req.body.id },
      {
        $push: {
          groupPost: {
            $each: [
              {
                userName: req.body.userName,
                content: req.body.content,
                file: req.file.filename,
                fileType: req.file.contentType,
              },
            ],
          },
        },
      },
      { upsert: true }
    )
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  } else {
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
  }
});

// update post
router.put("/postupdate", upload.single("file"), (req, res) => {
  console.log(req.file);
  if (req.file) {
    Item.updateOne(
      { "groupPost._id": req.body.id },
      {
        "groupPost.$.content": req.body.content,
        "groupPost.$.file": req.file.filename,
        "groupPost.$.fileType": req.file.contentType,
      }
    )
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  } else {
    Item.updateOne(
      { "groupPost._id": req.body.id },
      {
        "groupPost.$.content": req.body.content,
      }
    )
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  }
});
// delete a post
router.put("/grouppostde", (req, res) => {
  Item.updateOne(
    { groupPost: { $elemMatch: { _id: req.body.id } } },
    { $pull: { groupPost: { _id: req.body.id } } }
  )
    .then((response) => {
      res.json(response);
    })
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
          $each: [{ like: { $each: [{ userName: req.body.userName }] } }],
        },
      },
    },
    { multi: true }
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
        "groupPost.$.commentSection": {
          $each: [{ comment: req.body.comment, userName: req.body.userName }],
        },
      },
    }
  )
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

module.exports = router;
