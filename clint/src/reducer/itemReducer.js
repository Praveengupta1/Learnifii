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
} from "../Action/type";

const initialState = {
  groupdata: [],
  loading: false,
  msg: null,
  user: null,
  token: null,
  post: [],
};
const itemReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload.data,
        loading: false,
      };
    case LIKE_POST:
      return {
        ...state,
        loading: true,
      };
    case SET_USER:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: true,
      };
    case FETCH_DATA: {
      return {
        ...state,
        groupdata: action.payload,
        loading: false,
      };
    }
    case SET_MASSAGE:
      return {
        ...state,
        msg: action.payload,
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case GROUP_POST:
      return {
        ...state,
        loading: true,
        msg: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        loading: true,
        msg: action.payload,
      };
    case UPDATE_POST: {
      console.log(action);
      return {
        ...state,
        loading: true,
        msg: action.payload,
      };
    }
    case FOLLOW:
      return {
        ...state,
        loading: true,
      };
    case MAKE_COMMENT:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default itemReducer;
