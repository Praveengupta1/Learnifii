import {
  FETCH_DATA,
  LOADING_DATA,
  GROUP_POST,
  DELETE_POST,
  UPDATE_POST,
  SET_MASSAGE,
} from "../Action/type";

const initialState = {
  groupdata: [],
  loading: false,
  msg: null,
};
const itemReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default itemReducer;
