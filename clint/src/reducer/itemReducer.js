import {
  FETCH_DATA,
  LOADING_DATA,
  GROUP_POST,
  DELETE_POST,
  UPDATE_POST,
} from "../Action/type";

const initialState = {
  groupdata: [],
  loading: false,
};
const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      return {
        groupdata: action.payload,
        loading: false,
      };
    }
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case GROUP_POST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_POST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_POST:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default itemReducer;
