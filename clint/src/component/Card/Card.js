import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  CardMedia,
} from "@material-ui/core";
import { useStyles } from "../../assests/style";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeComment } from "../../Action/actionType";
import { useDispatch } from "react-redux";
import CardFooterAction from "./cardFooterAction";
import MakeAction from "./cardAction";
import { Link } from "react-router-dom";
import Comment from "./comment";
import "./Card.css";

function Post({ post, user, token, groupId }) {
  const classes = useStyles();
  const [isPostId, setisPostId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setisPostId(post._id);
  }, [post]);

  const [isComment, setisComment] = useState("");
  const handleComment = (e) => {
    e.preventDefault();

    if (isComment) {
      const data = {
        id: isPostId,
        comment: isComment,
      };

      dispatch(makeComment({ data: data, token: token }));
      setisComment("");
    }
  };
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateFormat = (date) => {
    var m = date.split("-")[1];
    var mName = month[parseInt(m)];
    var d = date.split("-")[2];
    var dName = d.split("T")[0];
    let dateFormated = mName + " " + dName;
    return dateFormated;
  };
  const name = (user) => {
    let name = user.split(" ");
    let firstName = name[0].charAt(0).toUpperCase();
    let secondName = name[1] ? name[1].charAt(0).toUpperCase() : "";
    return firstName + secondName;
  };

  return (
    <Card key={post._id} className={classes.cards}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatarpost}>{name(post.userName)}</Avatar>
        }
        action={
          user.email.trim().toLowerCase() === post.userId && (
            <MakeAction post={post} token={token} />
          )
        }
        title={
          <Link
            to={`/group/${groupId}/${post._id}`}
            style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.90)" }}
          >
            {post.userName.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })}
          </Link>
        }
        subheader={dateFormat(post.time)}
      />

      <CardContent>
        {post.content && (
          <Typography variant="body2" color="textSecondary" component="p">
            <p className="content">{post.content}</p>
          </Typography>
        )}
        {post.fileType === "image/png" && (
          <CardMedia
            className={classes.media}
            image={`/post/image/${post.file}`}
            title="post image"
          />
          // <div className="image-card">
          //   <img
          //     className="post-image"
          //     src=
          //     alt=" "
          //   />
          // </div>
        )}
        {post.fileType === "image/jpeg" && (
          <CardMedia
            className={classes.media}
            image={`/post/image/${post.file}`}
            title="post image"
          />
          // <div className="image-card">
          //   <img
          //     className="post-image"
          //     src={`/post/image/${post.file}`}
          //     alt=" "
          //   />
          // </div>
        )}
      </CardContent>

      <div className="action-numbers">
        <div className="action-number-like">
          {post.likes[0] ? post.likes[0].userName : null}
          {post.likes[1] ? post.likes[1].userName : null}
          {" " + post.likes.length + " Likes"}
        </div>
        <div className="action-number-comment">
          {post.comments.length + " Comments"}
        </div>
      </div>
      <CardActions>
        <CardFooterAction
          id={post._id}
          token={token}
          username={user.email}
          likes={post.likes}
          groupId={groupId}
        />
      </CardActions>
      <div className="like-avatar">
        <AvatarGroup max={4}>
          {post.likes.map((likeUser) => (
            <Avatar key={likeUser._id}>{name(likeUser.userName)}</Avatar>
          ))}
        </AvatarGroup>
        {/* <div className="like-name">
                like by
                <p>{post.like[0].userName}</p>
              </div> */}
      </div>
      <CardContent>
        <form className="comment" onSubmit={handleComment}>
          <div className={classes.comment}>
            <Avatar
              className={classes.avatarpost}
              style={{ height: "40px", width: "40px" }}
            >
              {name(user.name)}
            </Avatar>
            <input
              type="text"
              value={isComment}
              onChange={(e) => setisComment(e.target.value)}
            />
          </div>
          <button type="submit">Post</button>
        </form>
        <div>
          {post.comments.map((comment) => (
            <Comment
              groupId={groupId}
              postId={isPostId}
              comment={comment}
              token={token}
              key={comment._id}
              user={user}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Cards({ posts, user, token, groupId }) {
  return (
    <Fragment>
      {posts.map((post, i) =>
        post ? (
          <Post
            key={i}
            post={post}
            token={token}
            user={user}
            groupId={groupId}
          />
        ) : null
      )}
    </Fragment>
  );
}

export default Cards;
