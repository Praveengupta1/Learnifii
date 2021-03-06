import {
  FETCH_DATA_USER_AND_TOKEN,
  CLEAN_DATA_USER_AND_TOKEN,
} from "./userType";

import axios from "axios";

export const cleanUserAndToken = () => {
  return {
    type: CLEAN_DATA_USER_AND_TOKEN,
  };
};
export const setUserAndToken = (user) => (dispatch) => {
  axios
    .post("/user/", user[0])
    .then((res) =>
      dispatch({
        type: FETCH_DATA_USER_AND_TOKEN,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
