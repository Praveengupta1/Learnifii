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
} from './constant';

const baseStateAuth = {
  fetching: false,
  fetched: false,
  errors: null,
  user: null,
  saveLaterArray: null,
};

const reducer = (baseState, handlers) => (state = baseStateAuth, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};

const ACTION_HANDLERS = {
  [FETCHING_CURRENT_USER]: state => ({
    ...state,
    fetching: true,
    fetched: false,
    errors: null,
    user: null,
  }),
  [FETCHED_CURRENT_USER]: (state, payload) => ({
    ...state,
    fetching: false,
    fetched: true,
    errors: null,
    user: payload.data,
  }),

  [FETCH_CURRENT_USER_FAILED]: (state, payload) => ({
    ...state,
    fetching: false,
    fetched: true,
    errors: payload.errors,
    user: null,
  }),
  [LOGIN_USER]: state => ({
    ...state,
    fetching: true,
    fetched: false,
    errors: null,
    user: null,
  }),
  [LOGIN_USER_SUCCESS]: state => ({
    ...state,
    fetching: false,
    fetched: true,
    errors: null,
    user: null,
  }),
  [LOGIN_USER_FAILED]: (state, payload) => ({
    ...state,
    fetching: false,
    fetched: true,
    errors: payload.errors,
    user: null,
  }),
  [SIGNUP_USER]: state => ({
    ...state,
    fetching: true,
    fetched: false,
    errors: null,
    user: null,
  }),
  [SIGNUP_USER_SUCCESS]: state => ({
    ...state,
    fetching: false,
    fetched: true,
    errors: null,
    user: null,
  }),
  [SIGNUP_USER_FAILED]: (state, payload) => ({
    ...state,
    fetching: false,
    fetched: true,
    errors: payload.errors,
    user: null,
  }),
  [LOGOUT_USER]: state => ({
    ...state,
    user: null,
  }),
  [FETCHED_USER_PROFILE]: (state, payload) => ({
    ...state,
    profile: payload,
  }),
  [FETCHED_WISH_LIST]: (state, payload) => ({
    ...state,
    saveLater: payload,
  }),
  [POST_WISH_LIST]: (state, payload) => ({
    ...state,
    saveLater: payload,
  }),
  [DELETE_WISH_LIST]: (state, payload) => ({
    ...state,
    saveLater: payload,
  }),
  [FETCHED_WISH_LIST_ARRAY]: (state, payload) => ({
    ...state,
    saveLaterArray: payload,
  }),
  [POST_WISH_LIST_ARRAY]: (state, payload) => ({
    ...state,
    saveLaterArray: payload,
  }),
  [DELETE_WISH_LIST_ARRAY]: (state, payload) => ({
    ...state,
    saveLaterArray: payload,
  }),
};

export default reducer(baseStateAuth, ACTION_HANDLERS);
