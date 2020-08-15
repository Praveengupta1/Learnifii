import {
  FETCH_DATA,
  LOADING_DATA,
  GROUP_POST,
  DELETE_POST,
  UPDATE_POST,
} from "./type";
import axios from "axios";

//DELETE A POST
export const deletePost = (data) => (dispatch) => {
  axios
    .put("/api/grouppostde", data)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
      })
    )
    .catch((err) => console.log(err));
};
//POST A POST
export const updatePost = (data) => (dispatch) => {
  const postdata = async () => {
    await axios
      .put("/api/postupdate", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: UPDATE_POST,
        });
      })
      .catch((err) => console.log(err));
  };
  postdata();
};
//POST A POST
export const groupPost = (data) => (dispatch) => {
  const postdata = async () => {
    await axios
      .put("/api/grouppost", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: GROUP_POST,
          payload: res.status,
        });
      })
      .catch((err) => console.log(err));
  };
  postdata();
};

// GET DATA
export const fetchData = () => (dispatch) => {
  dispatch(loadingData);
  axios
    .get("/api/group")
    .then((res) =>
      dispatch({
        type: FETCH_DATA,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const loadingData = () => {
  return {
    type: LOADING_DATA,
  };
};
