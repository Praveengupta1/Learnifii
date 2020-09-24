import { FETCH_DATA_USER_AND_TOKEN } from "../Action/userType";

const initaialState = {
  user: null,
  token: null,
};

const userReducer = (state = initaialState, action) => {
  switch (action.type) {
    case FETCH_DATA_USER_AND_TOKEN: {
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
