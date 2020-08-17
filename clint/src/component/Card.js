import React, { useState, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useStyles } from "../assests/style";
import CommentIcon from "@material-ui/icons/Comment";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { deletePost } from "../Action/actionType";
import { useDispatch } from "react-redux";

function Post({ post }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (e) => {
    handleClose();

    const data = {
      id: e.target.id,
    };

    dispatch(deletePost(data));
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
  return (
    <Card key={post._id} className={classes.cards}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatarpost}>
            {post.userName.split("")[0]}
          </Avatar>
        }
        action={
          <React.Fragment>
            <IconButton aria-label="settings" className={classes.root} onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: {
                  marginTop: "5ch",
                },
              }}
            >
              <MenuItem id={post._id} onClick={handleDelete}>
                Delete
              </MenuItem>
              <MenuItem id={post._id}>Edit</MenuItem>
            </Menu>
          </React.Fragment>
        }
        title={post.userName}
        subheader={dateFormat(post.time)}
      />

      <CardContent>
        {post.content ? (
          <Typography variant="body2" color="textSecondary" component="p">
            <div className="content">{post.content}</div>
          </Typography>
        ) : null}
        {post.fileType === "image/png" && (
          <img
            className="post-image"
            src={`/api/image/${post.file}`}
            alt=" "
          />
        )}
        {post.fileType === "image/jpeg" && (
          <img
            className="post-image"
            src={`/api/image/${post.file}`}
            alt=" "
          />
        )}
      </CardContent>
      {/* {post.fileType === "image/png" && (
              <CardMedia
                key={post._id}
                className={classes.media}
                image={`http://localhost:4000/api/image/${post.file}`}
                title="Paella dish"
              />
            )}
            {post.fileType === "image/jpeg" && (
              <CardMedia
                key={post._id}
                className={classes.media}
                image={`http://localhost:4000/api/image/${post.file}`}
                title="Paella dish"
              />
            )} */}
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {post.like ? <label>{post.like.length + " Likes"}</label> : null}
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        {post.commentSection ? (
          <label>{post.commentSection.length + " comment"}</label>
        ) : null}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {post.noumberOfShare ? (
          <label>{post.noumberOfShare + " Shares"}</label>
        ) : null}
      </CardActions>
      <div className="like-avatar">
        <AvatarGroup max={4}>
          {post.like.map((likeUser) => (
            <Avatar key={likeUser._id}>{likeUser.userName.split("")[1]}</Avatar>
          ))}
          {/* <Avatar alt="Remy Sharp" src={img1} /> */}
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
              style={{ height: "60px", width: "60px" }}
            >
              R
            </Avatar>
            <input type="text" />
          </div>
        </form>
        <div>
          {post.commentSection.map((comment) => (
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

function Cards({ posts }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
 
  const sortpost = posts.sort((a, b) => new Date(b.time)-new Date(a.time))
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (e) => {
    handleClose();
    const data = {
      id: e.target.id,
    };

    dispatch(deletePost(data));
  };

  return (
    <Fragment>
      {sortpost
        .map((post) => (post ? <Post post={post} /> : null))}
    </Fragment>
  );
}

export default Cards;