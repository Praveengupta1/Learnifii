import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../Action/actionType";
import Card from "../Card/Card";
import Skeleton from "@material-ui/lab/Skeleton";

import "./getPost.css";

function GetPost({ token, user, loading }) {
  const Posts = useSelector((state) => state.group.post);
  const data = useParams();
  const [state, setstate] = useState([]);
  const dispatch = useDispatch();
  const [groupId, setgroupId] = useState("");
  useEffect(() => {
    dispatch(getPost({ data, token }));
  }, [data, loading]);

  const Post = Posts[0];
  useEffect(() => {
    if (Post) {
      setgroupId(Post._id);
      setstate(Post.posts);
    }
  }, [Posts]);

  return state[0] ? (
    <div style={{ marginTop: "100px" }}>
      <Card posts={state} token={token} user={user} groupId={groupId} />
    </div>
  ) : (
    <div style={{ marginTop: "100px" }}>
      <div className="card-skeleton">
        <div className="profile-skeleton">
          <Skeleton variant="circle" height={60} width={60} />
          <div className="discreption-skeleton">
            <Skeleton variant="rect" height={20} width={250} />
            <Skeleton variant="rect" height={20} width={250} />
          </div>
        </div>
        <div className="image-skeleton">
          <Skeleton variant="rect" height={400} />
        </div>
        <div className="action-skeleton">
          <Skeleton variant="rect" width={100} height={30} />
          <Skeleton variant="rect" width={100} height={30} />
          <Skeleton variant="rect" width={100} height={30} />
        </div>
      </div>
    </div>
  );
}

export default GetPost;
