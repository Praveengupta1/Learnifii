const Group = require("./group");
const Follow = require("./follow");
const Post = require("./post");
const Like = require("./like");
const Comment = require("./comment");
const GetPost = require("./getPost");
const routes = require("express").Router();
const LikeOnComment = require("./likeOnComment");
const ReplyOnComment = require("./replyforComment");
// all routes
routes.use("/group", Group);
routes.use("/follow", Follow);
routes.use("/post", Post);
routes.use("/like", Like);
routes.use("/comment", Comment);
routes.use("/getgroup", GetPost);
routes.use("/likeoncomment", LikeOnComment);
routes.use("/replyoncomment", ReplyOnComment);
module.exports = routes;
