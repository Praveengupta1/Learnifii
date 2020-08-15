import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

const rootReducer = combineReducers({
  group: itemReducer,
});

export default rootReducer;
