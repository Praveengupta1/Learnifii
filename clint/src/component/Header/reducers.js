/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from "./utils/history";
import languageProviderReducer from "./containers/lanProviderreducer";
import authReducer from "./containers/authreducer";
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers
  });

  return rootReducer;
}
