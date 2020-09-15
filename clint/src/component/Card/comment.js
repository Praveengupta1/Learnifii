import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Avatar, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { likeComment, replyComment } from "../../Action/actionType";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";

import "./comment.css";

function Comment({ comment, groupId, postId, token, user }) {
  const name = (user) => {
    let name = user.split(" ");
    let firstName = name[0].charAt(0).toUpperCase();
    let secondName = name[1] ? name[1].charAt(0).toUpperCase() : "";
    return firstName + secondName;
  };
  const dispatch = useDispatch();

  const [isLikeAction, setisLikeAction] = useState("gray");
  const [commentId, setcommentId] = useState("");
  useEffect(() => {
    setcommentId(comment._id);
  }, [comment]);
  useEffect(() => {
    console.log(comment.likes);

    const isLikePost = comment.likes.filter(
      (like) => like.userId === user.email
    );
    console.log(isLikePost);
    isLikePost[0] ? setisLikeAction("red") : setisLikeAction("gray");
  }, []);
  const handleLike = () => {
    isLikeAction === "red" ? setisLikeAction("gray") : setisLikeAction("red");
    const data = {
      id: groupId,
      postId: postId,
      commentId: commentId,
    };
    dispatch(likeComment({ data: data, token: token }));
  };
  const [State, setState] = useState("none");

  const handleReply = () => {
    if (State === "none") setState("flex");
    if (State === "flex") setState("none");
  };

  const [reply, setreply] = useState("");
  const makeReply = (e) => {
    e.preventDefault();
    if (reply) {
      const data = {
        id: groupId,
        postId: postId,
        commentId: commentId,
        content: reply,
      };
      dispatch(replyComment({ data, token }));
      setreply("");
    }
  };

  return (
    <>
      <div className="post-comment">
        <Avatar> {name(comment.userName)} </Avatar>
        <div className="post-comment-box">
          <h4>{comment.userName}</h4>
          <p>
            {comment.comment}
            {/* <span className="post-comment-thumb">
              <ThumbUpAltOutlinedIcon style={{ color: "#00bcd4" }} /> 343
            </span> */}
          </p>
          <span className="post-comment-like-span" onClick={handleLike}>
            <FavoriteIcon style={{ color: isLikeAction }} />
          </span>
          <span className="post-comment-reply-span" onClick={handleReply}>
            Reply
          </span>
          <span className="time-stamp">4m ago</span>
        </div>
      </div>
      {comment.replies.map((reply, i) => (
        <div key={i} className="post-comment-reply">
          <Avatar> {name(reply.userName)}</Avatar>
          <div className="post-comment-box">
            <h4>{reply.userName}</h4>
            <p>
              {reply.content}
              {/* <span className="post-comment-thumb">
                <ThumbUpAltOutlinedIcon style={{ color: "#00bcd4" }} /> 343
              </span> */}
            </p>

            <span className="post-comment-reply-span" onClick={handleReply}>
              Reply
            </span>
            <span className="time-stamp">4m ago</span>
          </div>
        </div>
      ))}

      <div
        className="post-comment-reply comment-new-reply"
        style={{ display: State }}
      >
        <Avatar>{name(user.name)}</Avatar>
        <div className="new-reply">
          <form>
            <input
              type="text"
              onChange={(e) => setreply(e.target.value)}
              value={reply}
            />
            <button onClick={makeReply}>Reply</button>
          </form>
        </div>
      </div>
    </>
    // <div className="comment-people">
    //   <div className="name">
    //     <div style={{ display: "flex" }}>
    //       <Avatar
    //         style={{ height: "30px", width: "30px" }}
    //         src={comment.userPhoto}
    //       />
    //       <div className="comment-people-name">
    //         <h6 style={{ textTransform: "capitalize" }}>{comment.userName}</h6>
    //         <p>{comment.comment}</p>
    //       </div>
    //     </div>
    //     <div>14m ago</div>
    //     <div>
    //       <button onClick={handleReply}>Reply</button>
    //     </div>
    //     <div>
    //       <IconButton onClick={handlelike}>
    //         <FavoriteBorderIcon />
    //       </IconButton>
    //     </div>
    //   </div>
    //   <div className="comment-reply" style={{ display: State }}>
    //     <form>
    //       <input
    //         type="text"
    //         value={reply}
    //         onChange={(e) => setreply(e.target.value)}
    //       />
    //       <button type="submit" onClick={makeReply}>
    //         Reply
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}

export default Comment;
