import {
  FETCH_DATA,
  LOADING_DATA,
  GROUP_POST,
  DELETE_POST,
  UPDATE_POST,
  SET_MASSAGE,
  SET_USER,
  LIKE_POST,
  FOLLOW,
  MAKE_COMMENT,
  GET_POST,
  LIKE_COMMENT,
  REPLY_COMMENT,
} from "./type";
import axios from "axios";

//REPLY ON COMMENT

export const replyComment = ({ data, token }) => (dispatch) => {
  axios
    .post("/replyoncomment", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) =>
      dispatch({
        type: REPLY_COMMENT,
      })
    );
};

//LIKE ON COMMENT
export const likeComment = ({ data, token }) => (dispatch) => {
  axios
    .post("/likeoncomment", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) =>
      dispatch({
        type: LIKE_COMMENT,
        payload: res,
      })
    );
};

// GET POST BY GROUPID AND PSOTID
export const getPost = ({ data, token }) => (dispatch) => {
  const { groupId, postId } = data;
  axios
    .get(`/getgroup/${groupId}/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) =>
      dispatch({
        type: GET_POST,
        payload: response.data,
      })
    );
};
// make a comment
export const makeComment = ({ data, token }) => (dispatch) => {
  axios
    .post("/comment", data, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) =>
      dispatch({
        type: MAKE_COMMENT,
      })
    );
};

// LIKE A POST
export const likePost = ({ data, token }) => (dispatch) => {
  axios
    .post("/like", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: LIKE_POST,
      });
    });
};
//set user
export const setUser = (user) => (dispatch) => {
  axios
    .post("/user/", user)
    .then((res) =>
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
//set message
export const setMassage = () => {
  return {
    type: SET_MASSAGE,
    payload: null,
  };
};
//DELETE A POST
export const deletePost = ({ data, token }) => (dispatch) => {
  axios
    .post("/post/delete", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: "DELETE_POST",
      })
    )
    .catch((err) => console.log(err));
};
//Update A POST
export const updatePost = ({ data, token }) => (dispatch) => {
  const postdata = async () => {
    await axios
      .post("/post/update", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: UPDATE_POST,
          payload: "UPDATE_POST",
        });
      })
      .catch((err) => console.log(err));
  };
  postdata();
};
//POST A POST
export const groupPost = ({ data, token }) => (dispatch) => {
  const postdata = async () => {
    await axios
      .post("/post/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: GROUP_POST,
          payload: "MAKE_POST",
        });
      })
      .catch((err) => console.log(err));
  };
  postdata();
};
// follow request or unfollow request
export const followRequest = ({ data, token }) => (dispatch) => {
  axios
    .post("/follow", data, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) =>
      dispatch({
        type: FOLLOW,
      })
    );
};
// GET DATA
export const fetchData = (token) => (dispatch) => {
  dispatch(loadingData);
  axios
    .get("/group", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      dispatch({
        type: FETCH_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const loadingData = () => {
  return {
    type: LOADING_DATA,
  };
};
