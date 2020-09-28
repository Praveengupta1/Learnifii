import {
  FETCH_DATA_USER_AND_TOKEN,
  CLEAN_DATA_USER_AND_TOKEN,
} from "../Action/userType";

const initaialState = {
  user: null,
  token: null,
};

const userReducer = (state = initaialState, action) => {
  switch (action.type) {
    case FETCH_DATA_USER_AND_TOKEN: {
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case CLEAN_DATA_USER_AND_TOKEN:
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default userReducer;
