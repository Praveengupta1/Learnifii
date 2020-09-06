const Group = require("./group");
const Follow = require("./follow");
const Post = require("./post");
const Like = require("./like");

const routes = require("express").Router();

// all routes
routes.use("/group", Group);
routes.use("/follow", Follow);
routes.use("/post", Post);
routes.use("/like", Like);
module.exports = routes;
