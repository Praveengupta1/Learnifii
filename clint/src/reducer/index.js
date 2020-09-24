import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import history from "../component/Header/utils/history";
import languageProviderReducer from "../component/Header/containers/lanProviderreducer";
import authReducer from "../component/Header/containers/authreducer";
import userReducer from "./userReducer";
import { connectRouter } from "connected-react-router";

const rootReducer = combineReducers({
  user: userReducer,
  group: itemReducer,
  language: languageProviderReducer,
  auth: authReducer,
  router: connectRouter(history),
});

export default rootReducer;
