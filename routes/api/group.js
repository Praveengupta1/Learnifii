const Group = require("express").Router();
// fucntion for verify token
const verifytoken = require("../../config/token");
const jwt = require("jsonwebtoken");
const Item = require("../../model/Item");

Group
  // get data
  .get("/", verifytoken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, data) => {
      if (err) {
        res.statusCode(403).json({ auth: "please login " });
      } else {
        Item.find()
          .sort({ date: -1 })
          .then((item) => res.json(item));
      }
    });
  })

  // create group route
  .post("/create", verifytoken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err) => {
      if (err) {
        res.json({ status: 403, messsage: "unauth" });
      } else {
        const item = new Item({
          groupName: req.body.groupName.toLowerCase(),
        });

        try {
          Item.findOne({ groupName: req.body.groupName.toLowerCase() })
            .then((response) => {
              response
                ? res.json({ massage: "already exists", response })
                : item
                    .save()
                    .then((response) => res.json(response))
                    .catch((err) => res.json(err));
            })
            .catch((err) =>
              res.json({
                err: err,
                message: "any error with requrest try again ",
              })
            );
        } catch (e) {
          res.json({ error: e, meessage: "any error with your post request " });
        }
      }
    });
  })
  // // delete group
  .post("/delete", verifytoken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err) => {
      if (err) {
        res.json({ status: 403, message: "unauth" });
      } else {
        Item.deleteOne({ _id: req.body.id })
          .then((response) => res.json(response))
          .catch((error) =>
            res.json((error) =>
              res.json({ error: error, message: "I can't delete group " })
            )
          );
      }
    });
  });

module.exports = Group;
