import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
} from "@material-ui/core";

import { useStyles } from "../../assests/style";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { likePost } from "../../Action/actionType";
import { useDispatch } from "react-redux";
import CardFooterAction from "./cardFooterAction";
import MakeAction from "./cardAction";
import "./Card.css";

function Post({ post, user, token }) {
  const classes = useStyles();

  const dispatch = useDispatch();

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

  return (
    <Card key={post._id} className={classes.cards}>
      <CardHeader
        avatar={<Avatar src={post.userPhoto} className={classes.avatarpost} />}
        action={
          user.email.trim().toLowerCase() === post.userId && (
            <MakeAction post={post} token={token} />
          )
        }
        title={post.userName.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })}
        subheader={dateFormat(post.time)}
      />

      <CardContent>
        {post.content && (
          <Typography variant="body2" color="textSecondary" component="p">
            <p className="content">{post.content}</p>
          </Typography>
        )}
        {post.fileType === "image/png" && (
          <div className="image-card">
            <img
              className="post-image"
              src={`/post/image/${post.file}`}
              alt=" "
            />
          </div>
        )}
        {post.fileType === "image/jpeg" && (
          <div className="image-card">
            <img
              className="post-image"
              src={`/api/image/${post.file}`}
              alt=" "
            />
          </div>
        )}
      </CardContent>

      <CardActions>
        <CardFooterAction
          id={post._id}
          token={token}
          username={user.email}
          likes={post.likes}
        />
      </CardActions>
      <div className="like-avatar">
        <AvatarGroup max={4}>
          {post.likes.map((likeUser) => (
            <Avatar key={likeUser._id} src={likeUser.userPhoto} />
          ))}
        </AvatarGroup>
        {/* <div className="like-name">
                like by
                <p>{post.like[0].userName}</p>
              </div> */}
      </div>
      <CardContent>
        <form>
          <div className={classes.comment}>
            <Avatar
              aria-label="recipe"
              className={classes.avatarpost}
              style={{ height: "40px", width: "40px" }}
              src={user.profile_image_url}
            />
            <input type="text" />
          </div>
        </form>
        <div>
          {post.comments.map((comment) => (
            <div key={comment._id} className="comment-people">
              <div className="name">
                <div style={{ display: "flex" }}>
                  <Avatar style={{ height: "60px", width: "60px" }}>
                    {comment.userName.split("")[0]}
                  </Avatar>
                  <div className="comment-people-name">
                    <h4>{comment.userName}</h4>
                    <p>{comment.comment}</p>
                  </div>
                </div>
                <div>14m ago</div>
                <div>Reply</div>
                <div>
                  <FavoriteBorderIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Cards({ posts, user, token }) {
  return (
    <Fragment>
      {posts.map((post, i) =>
        post ? <Post key={i} post={post} token={token} user={user} /> : null
      )}
    </Fragment>
  );
}

export default Cards;
