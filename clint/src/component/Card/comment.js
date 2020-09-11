import React, { useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Avatar, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { likeComment, replyComment } from "../../Action/actionType";

function Comment({ comment, groupId, postId, token }) {
  const dispatch = useDispatch();
  const handlelike = () => {
    const data = {
      id: groupId,
      postId: postId,
      commentId: comment._id,
    };
    dispatch(likeComment({ data: data, token: token }));
  };
  const [State, setState] = useState("none");

  const handleReply = () => {
    if (State === "none") setState("block");
    if (State === "block") setState("none");
  };

  const [reply, setreply] = useState("");
  const makeReply = (e) => {
    e.preventDefault();
    const data = {
      id: groupId,
      postId: postId,
      commentId: comment._id,
      content: reply,
    };
    dispatch(replyComment({ data, token }));
    setreply("");
  };
  return (
    <div className="comment-people">
      <div className="name">
        <div style={{ display: "flex" }}>
          <Avatar
            style={{ height: "30px", width: "30px" }}
            src={comment.userPhoto}
          />
          <div className="comment-people-name">
            <h6 style={{ textTransform: "capitalize" }}>{comment.userName}</h6>
            <p>{comment.comment}</p>
          </div>
        </div>
        <div>14m ago</div>
        <div>
          <button onClick={handleReply}>Reply</button>
        </div>
        <div>
          <IconButton onClick={handlelike}>
            <FavoriteBorderIcon />
          </IconButton>
        </div>
      </div>
      <div className="comment-reply" style={{ display: State }}>
        <form>
          <input
            type="text"
            value={reply}
            onChange={(e) => setreply(e.target.value)}
          />
          <button type="submit" onClick={makeReply}>
            Reply
          </button>
        </form>
      </div>
    </div>
  );
}

export default Comment;
