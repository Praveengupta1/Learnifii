const Test = require("express").Router();

const verifytoken = require("../../config/token");
const jwt = require("jsonwebtoken");

Test.get("/", verifytoken, (req, res) => {
  jwt.verify(req.token, "wowwow", (err, data) => {
    err ? res.send(err) : res.send(data);
  });
});

module.exports = Test;
