import ajax from "../utils/api";
import { ACCESS_TOKEN } from "./constants";
import { API_V1_URL } from "./constants";
import { post } from "../utils/requestUtils";

export default (state = {}) => {
  const { createAPI } = ajax(state);
  const baseURL = "https://learnifii-web.herokuapp.com";
  let config = {
    baseURL,
  };
  if (localStorage.getItem(ACCESS_TOKEN)) {
    config = {
      ...config,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    };
  }
  const api = createAPI(config);

  return {
    getCurrentUser: function fetchCurrentUser() {
      return api.get(`/user/me`);
    },
    getUserProfile: function fetchUserProfile() {
      return api.get(`/myprofile`);
    },
    updateUserProfile: function updateUserProfile(params) {
      return api.post(`/editprofile`, params);
    },
    getWishList: function fetchWishList() {
      return api.get(`/wishlist`);
    },
    postWishList: function postWishList(params) {
      return api.post(`/wishlist`, params);
    },
    deleteWishList: function deleteWishList(params) {
      return api.post(`/deletewishlist`, params);
    },
    login: function loginUser(params) {
      return api.post(`/auth/login`, params);
    },
    signup: function signupUser(params) {
      return api.post(`/auth/signup`, params);
    },
    subscribe: function subscribeUser(para) {
      return api.post(`/subscribe`, para);
    },
  };
};

export const loginFB = (body) =>
  post(`${API_V1_URL}/v1/auth/facebook/login`, body);

export const signinGoogle = (body) =>
  post(`${API_V1_URL}/v1/auth/google/login`, body);
