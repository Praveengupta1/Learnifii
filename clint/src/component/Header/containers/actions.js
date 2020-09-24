import { ACCESS_TOKEN } from "./constants";
import { notify } from "../utils/notifications";
import { setUserAndToken } from "../../../Action/userAction";
import api, { loginFB, signinGoogle } from "./api";
import {
  FETCHING_CURRENT_USER,
  FETCHED_CURRENT_USER,
  FETCH_CURRENT_USER_FAILED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILED,
  LOGOUT_USER,
  FETCHED_USER_PROFILE,
  FETCHED_WISH_LIST,
  FETCHING_WISH_LIST_FAILED,
  POST_WISH_LIST,
  DELETE_WISH_LIST,
  FETCHED_WISH_LIST_ARRAY,
  POST_WISH_LIST_ARRAY,
  DELETE_WISH_LIST_ARRAY,
} from "./actionType";
import { data } from "jquery";

const fetchingCurrentUser = () => ({
  type: FETCHING_CURRENT_USER,
});

const fetchedCurrentUser = (payload) => ({
  type: FETCHED_CURRENT_USER,
  payload,
});

const fetchingCurrentUserFailed = (payload) => ({
  type: FETCH_CURRENT_USER_FAILED,
  payload,
});

const loginUser = () => ({
  type: LOGIN_USER,
});

const loginUserSuccess = () => ({
  type: LOGIN_USER_SUCCESS,
});

const loginUserFailed = (payload) => ({
  type: LOGIN_USER_FAILED,
  payload,
});

export const signupUser = () => ({
  type: SIGNUP_USER,
});

export const signupUserSuccess = () => ({
  type: SIGNUP_USER_SUCCESS,
});

export const signupUserFailed = (payload) => ({
  type: SIGNUP_USER_FAILED,
  payload,
});

const logoutUser = () => ({
  type: LOGOUT_USER,
});

const fetchedUserProfile = (payload) => ({
  type: FETCHED_USER_PROFILE,
  payload,
});

const fetchedWishList = (payload) => ({
  type: FETCHED_WISH_LIST,
  payload,
});

const fetchingWishListFailed = (payload) => ({
  type: FETCHING_WISH_LIST_FAILED,
  payload,
});
const postedWishList = (payload) => ({
  type: POST_WISH_LIST,
  payload,
});
const deletedWishList = (payload) => ({
  type: DELETE_WISH_LIST,
  payload,
});

const fetchedWishListArray = (payload) => ({
  type: FETCHED_WISH_LIST_ARRAY,
  payload,
});
const postedWishListArray = (payload) => ({
  type: POST_WISH_LIST_ARRAY,
  payload,
});
const deletedWishListArray = (payload) => ({
  type: DELETE_WISH_LIST_ARRAY,
  payload,
});

// THUNK
// export const getCurrentUser = () => (dispatch, getState) => {
//   dispatch(fetchingCurrentUser());
//   if (!localStorage.getItem(ACCESS_TOKEN)) {
//     dispatch(fetchingCurrentUserFailed({ error: 'No access token set.' }));
//     return Promise.reject(new Error('No access token set.'));
//   }
//   return api(getState())
//     .getCurrentUser()
//     .then(response => {
//       const { data } = response;
//       dispatch(fetchedCurrentUser({ data }));
//       return Promise.resolve(data);
//     })
//     .catch(error => {
//       dispatch(
//         fetchingCurrentUserFailed({
//           error,
//         }),
//       );
//       return Promise.reject(error);
//     });
// };
export const getProfile = () => (dispatch, getState) => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    dispatch(fetchingCurrentUserFailed({ error: "No access token set." }));
    return Promise.reject(new Error("No access token set."));
  }

  return api()
    .getUserProfile()
    .then((response) => {
      const { data } = response;
      dispatch(setUserAndToken(data));
      dispatch(fetchedUserProfile({ data }));
      return Promise.resolve(data);
    })
    .catch((error) => {
      dispatch(
        fetchingCurrentUserFailed({
          error,
        })
      );
      return Promise.reject(error);
    });
};
export const updateProfile = (params) => (dispatch, getState) => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    dispatch(fetchingCurrentUserFailed({ error: "No access token set." }));
    return Promise.reject(new Error("No access token set."));
  }
  var data = [];
  data.push(params);
  console.log(data);
  dispatch(fetchedUserProfile({ data }));
  return api()
    .updateUserProfile(params)
    .then((response) => {
      const { data } = response;
      console.log("data", data);
      return Promise.resolve(data);
    })
    .catch((error) => {
      dispatch(
        fetchingCurrentUserFailed({
          error,
        })
      );
      return Promise.reject(error);
    });
};
export const getCurrentUser = () => (dispatch, getState) => {
  dispatch(fetchingCurrentUser());

  if (!localStorage.getItem(ACCESS_TOKEN)) {
    dispatch(fetchingCurrentUserFailed({ error: "No access token set." }));
    return Promise.reject(new Error("No access token set."));
  }

  return api(getState())
    .getCurrentUser()
    .then((response) => {
      const { data } = response;
      dispatch(fetchedCurrentUser({ data }));
      dispatch(getProfile());
      dispatch(getWishList());
      return Promise.resolve(data);
    })
    .catch((error) => {
      dispatch(
        fetchingCurrentUserFailed({
          error,
        })
      );
      return Promise.reject(error);
    });
};

export const getWishList = () => (dispatch, getState) => {
  console.log("getWishlist called");
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    dispatch(fetchingCurrentUserFailed({ error: "No access token set." }));
    return Promise.reject(new Error("No access token set."));
  }
  return api()
    .getWishList()
    .then((response) => {
      const { data } = response.data;
      var saveLater = {};
      response.data.forEach((saveLaterObject) => {
        saveLater[saveLaterObject.activity_id] = true;
      });
      console.log("response.data in wishlist", response.data);
      dispatch(fetchedWishList(saveLater));
      dispatch(fetchedWishListArray(response.data));
      return Promise.resolve(data);
    })
    .catch((error) => {
      dispatch(
        fetchingWishListFailed({
          error,
        })
      );
      return Promise.reject(error);
    });
};
export const postWishList = (params) => (dispatch, getState) => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    dispatch(fetchingCurrentUserFailed({ error: "No access token set." }));
    return Promise.reject(new Error("No access token set."));
  }

  return api()
    .postWishList(params)
    .then((response) => {
      console.log(response);
      var saveLater = {};
      saveLater = getState().auth.saveLater;
      var saveLaterArray = getState().auth.saveLaterArray;
      saveLater[params.activity_id] = true;
      var saveLaterObj = {};
      saveLaterObj["activity_id"] = params.activity_id;
      saveLaterObj["id"] = params.batch_id;
      saveLaterObj["class_date"] = params.classdate;
      saveLaterObj["class_name"] = params.classname;
      saveLaterObj["class_time"] = params.classtime;
      saveLaterObj["class_url"] = params.classurl;
      saveLaterObj["class_venue"] = params.classvenue;
      saveLaterObj["net_amount"] = params.net_amount;
      saveLaterObj["slug"] = params.slug;
      saveLaterArray.push(saveLaterObj);
      dispatch(postedWishList(saveLater));
      dispatch(postedWishListArray(saveLaterArray));
      console.log(saveLaterArray);
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch(
        fetchingWishListFailed({
          error,
        })
      );
      return Promise.reject(error);
    });
};
export const deleteWishList = (params) => (dispatch, getState) => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    dispatch(fetchingCurrentUserFailed({ error: "No access token set." }));
    return Promise.reject(new Error("No access token set."));
  }
  var saveLaterArray = getState().auth.saveLaterArray;
  saveLaterArray = saveLaterArray.filter(
    (i) => i.activity_id !== params.activity_id
  );
  dispatch(deletedWishListArray(saveLaterArray));
  return api()
    .deleteWishList(params)
    .then((response) => {
      console.log(response);
      var saveLater = {};
      saveLater = getState().auth.saveLater;
      saveLater[params.activity_id] = false;
      // var saveLaterArray = getState().auth.saveLaterArray;
      // saveLaterArray = saveLaterArray.filter(
      //   i => i.activity_id !== params.activity_id,
      // );
      dispatch(deletedWishList(saveLater));
      // dispatch(deletedWishListArray(saveLaterArray));
      console.log("deleting", saveLaterArray);
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch(
        fetchingWishListFailed({
          error,
        })
      );
      return Promise.reject(error);
    });
};

export const login = (params) => (dispatch, getState) => {
  dispatch(loginUser());
  return api(getState())
    .login(params)
    .then((response) => {
      const { data } = response;
      localStorage.setItem(ACCESS_TOKEN, data.accessToken);
      dispatch(loginUserSuccess());
      notify("Logged in successfully.", "success");
      // fetch current user again
      dispatch(getCurrentUser());
      return Promise.resolve(data);
    })
    .catch((error) => {
      dispatch(
        loginUserFailed({
          error,
        })
      );
      notify(error.message, "error");
      return Promise.reject(error);
    });
};

export const signup = (params) => (dispatch, getState) => {
  dispatch(signupUser());
  return api(getState())
    .signup(params)
    .then((response) => {
      const { data } = response;
      dispatch(signupUserSuccess());
      notify("Signed up successfully.", "success");
      return Promise.resolve(data);
    })
    .catch((error) => {
      dispatch(
        signupUserFailed({
          error,
        })
      );
      notify(error.message, "error");
      return Promise.reject(error);
    });
};

export const loginFacebook = (body) => async (dispatch) => {
  try {
    dispatch(loginUser());
    const response = await loginFB(body);
    localStorage.setItem(ACCESS_TOKEN, response.token);
    dispatch(getCurrentUser());
    dispatch(loginUserSuccess());
    notify("Logged in successfully.", "success");
  } catch (error) {
    dispatch(loginUserFailed({ error }));
    notify(error.message, "error");
  }
};

export const loginGoogle = (body) => async (dispatch) => {
  try {
    dispatch(loginUser());
    const response = await signinGoogle(body);
    localStorage.setItem(ACCESS_TOKEN, response.token);
    dispatch(getCurrentUser());
    dispatch(loginUserSuccess());
    notify("Logged in successfully.", "success");
  } catch (error) {
    dispatch(loginUserFailed({ error }));
    notify(error.message, "error");
  }
};

export const logout = () => (dispatch) => {
  dispatch(logoutUser());
  dispatch(fetchedUserProfile(null));
  dispatch(postedWishList({}));
  dispatch(postedWishListArray([]));
  localStorage.removeItem(ACCESS_TOKEN);
  notify("Logged out successfully.", "success");
};

export const subscribe = (params) => (dispatch, getState) =>
  api(getState())
    .subscribe(params)
    .then((response) => {
      const { data } = response;
      notify("Subscribed successfully.", "success");
      return Promise.resolve(data);
    })
    .catch((error) => {
      // This is intentional to prevent user from leaving the site
      notify("Subscribed successfully.", "success");
      return Promise.reject(error);
    });
