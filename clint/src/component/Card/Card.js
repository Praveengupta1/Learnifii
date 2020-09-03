import React, { useState, Fragment, useEffect } from "react";
import {
  Card,
  CardHeader,
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
import { useStyles } from "../../assests/style";
import CommentIcon from "@material-ui/icons/Comment";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { deletePost, updatePost, likePost } from "../../Action/actionType";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import "./Card.css";

function Post({ post, user, token }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalDel, setmodalDel] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [isEditInput, setIsEditInput] = useState("");
  const [isLikeId, setisLikeId] = useState("");

  useEffect(() => {
    console.log(post);
    setIsEditInput(post.content);
    setisLikeId(post._id);
  }, [post.content, post.id]);
  const [isEditFile, setIsEditFile] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (e) => {
    const data = {
      id: e.target.id,
    };
    dispatch(deletePost({ data, data, token: token }));
    modalDelClose();
  };

  const modalDelClose = () => setmodalDel(false);
  const modalDelShow = () => {
    handleClose();
    setmodalDel(true);
  };

  const modalEditClose = () => {
    setmodalEdit(false);
  };
  const modalEditShow = () => {
    handleClose();
    setmodalEdit(true);
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

  const [isAction, setisAction] = useState("gray");

  const actionStyle = {
    color: isAction,
  };

  const handleAction = () => {
    if (isAction === "gray") {
      setisAction("red");
    } else {
      setisAction("gray");
    }
    const formdata = new FormData();
    console.log(isLikeId);
    const data = { id: isLikeId };
    dispatch(likePost({ data: data, token: token }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (isEditInput || isEditFile) {
      console.log(isEditFile, isEditInput);
      const formData = new FormData();
      formData.append("id", e.target.id);
      formData.append("content", isEditInput);
      formData.append("file", isEditFile);

      dispatch(updatePost({ data: formData, token: token }));

      setmodalEdit(false);
      setIsEditFile("");
    }
  };
  return (
    <Card key={post._id} className={classes.cards}>
      <CardHeader
        avatar={<Avatar src={post.userPhoto} className={classes.avatarpost} />}
        action={
          <React.Fragment key={post._id}>
            <IconButton
              aria-label="settings"
              className={classes.button}
              onClick={handleClick}
            >
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
              <MenuItem onClick={modalDelShow}>Delete</MenuItem>
              <MenuItem onClick={modalEditShow}>Edit</MenuItem>
            </Menu>

            <Modal show={modalDel} onHide={modalDelClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Delete Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure, delete this post</Modal.Body>
              <Modal.Footer>
                <Button className="button" size="sm" onClick={modalDelClose}>
                  Cancel
                </Button>
                <Button
                  className="button"
                  size="sm"
                  id={post._id}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={modalEdit} onHide={modalEditClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="edit-text">
                    <textarea
                      row="5"
                      type="text"
                      value={isEditInput}
                      onChange={(e) => setIsEditInput(e.target.value)}
                    />
                  </div>
                  <div className="edit-file">
                    <div>
                      <input
                        accept="image/jpeg, image/png"
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => setIsEditFile(e.target.files[0])}
                      />
                    </div>
                    <div>
                      <Button className="button" onClick={modalEditClose}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={handleEditSubmit}
                        className="button"
                        id={post._id}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </React.Fragment>
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
              src={`/api/image/${post.file}`}
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
        <div>
          <IconButton onClick={handleAction}>
            <FavoriteIcon style={actionStyle} />
          </IconButton>
          {/* {post.like ? <label>{post.like.length + " Likes"}</label> : null} */}
          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
          {/* {post.commentSection ? (
          <label>{post.commentSection.length + " comment"}</label>
        ) : null} */}
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {/* {post.noumberOfShare ? (
          <label>{post.noumberOfShare + " Shares"}</label>
        ) : null} */}
        </div>
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
              style={{ height: "40px", width: "40px" }}
              src={user.profile_image_url}
            />
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

function Cards({ posts, user, token }) {
  const sortpost = posts.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <Fragment>
      {sortpost.map((post, i) =>
        post ? <Post key={i} post={post} token={token} user={user} /> : null
      )}
    </Fragment>
  );
}

export default Cards;