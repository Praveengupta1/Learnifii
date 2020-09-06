const verifytoken = require("../../config/token");
const jwt = require("jsonwebtoken");
const Grid = require("gridfs-stream");

const Post = require("express").Router();
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("../../db/mongoose");

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
  options: { useUnifiedTopology: true },
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
const uploadImage = multer({ storage });

//@GET  for image
Post.get("/image/:filename", (req, res) => {
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

Post.post("/create", verifytoken, uploadImage.single("file"), (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authdata) => {
    if (err) {
      res.statusCode({ status: 403, message: "unauthroization" });
    } else {
      if (req.file) {
        console.log("with file ");
        Item.updateOne(
          { _id: req.body.id },
          {
            $push: {
              groupPost: {
                $each: [
                  {
                    userName: authdata.userdata.name.toLowerCase(),
                    userId: authdata.userdata.email.toLowerCase(),
                    file: req.file.filename,
                    fileType: req.file.contentType,
                    userPhoto: authdata.userdata.profile_image_url,
                    content: req.body.content,
                  },
                ],
                $positon: 0,
              },
            },
          },
          { upsert: true }
        )
          .then((response) => res.json(response))
          .catch((error) => res.json(error));
      } else {
        console.log("no file ");
        Item.updateOne(
          { _id: req.body.id },
          {
            $push: {
              groupPost: {
                $each: [
                  {
                    userName: authdata.userdata.name.toLowerCase(),
                    userId: authdata.userdata.email.toLowerCase(),

                    userPhoto: authdata.userdata.profile_image_url,
                    content: req.body.content,
                  },
                ],
                $position: 0,
              },
            },
          },
          { upsert: true }
        )
          .then((response) => res.json(response))
          .catch((error) => res.json(error));
      }
    }
  });
});

// update post
Post.post("/update", verifytoken, uploadImage.single("file"), (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authdata) => {
    if (err) res.statusCode(403).json({ error: err, message: "unauth" });
    else {
      try {
        if (req.file) {
          Item.updateOne(
            { "groupPost._id": req.body.id },
            {
              "groupPost.$.userName": authdata.userdata.name.toLowerCase(),
              "groupPost.$.userId": authdata.userdata.email.toLowerCase(),
              "groupPost.$.userPhoto": authdata.userdata.profile_image_url,
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
              "groupPost.$.userName": authdata.userdata.name.toLowerCase(),
              "groupPost.$.userId": authdata.userdata.email.toLowerCase(),
              "groupPost.$.userPhoto": authdata.userdata.profile_image_url,
              "groupPost.$.content": req.body.content,
            }
          )
            .then((response) => res.json(response))
            .catch((error) =>
              res.json({ error: error, message: "any error with mongo" })
            );
        }
      } catch (e) {
        res.json({ error: e, message: "any error with api " });
      }
    }
  });
});

// delete post
Post.post("/delete", verifytoken, (req, res) => {
  try {
    Item.updateOne(
      { groupPost: { $elemMatch: { _id: req.body.id } } },
      { $pull: { groupPost: { _id: req.body.id } } }
    )
      .then((response) => {
        res.json(response);
      })
      .catch((error) => res.json(error));
  } catch (e) {
    res.json({ error: e, message: "any error with api " });
  }
});

module.exports = Post;
