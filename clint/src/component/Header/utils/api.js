import axios from "axios";
// import qs from 'qs';
import _ from "lodash";
import { ACCESS_TOKEN } from "../containers/constants";

// some default configuration
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
// prevent the default xsrf header addition
axios.defaults.xsrfCookieName = undefined;
axios.defaults.baseURL = process.env.API_BASE_URL;

// this was not working as expected
// if (localStorage.getItem(ACCESS_TOKEN)) {
//   axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
//     ACCESS_TOKEN
//   )}`;
// }

const requestSuccessInterceptor = (config) => {
  // provide the canceler if asked
  if (config.getCancelToken) {
    const cancel = config.getCancelToken;
    // eslint-disable-next-line no-param-reassign
    delete config.getCancelToken;
    // eslint-disable-next-line no-param-reassign
    config.cancelToken = new axios.CancelToken(function executer(c) {
      cancel(c);
    });
  }
  const { isFormData, data, ...otherConfig } = config;

  let newData = data;
  switch (config.method) {
    case "get":
      return {
        ...config,
        params: {
          ...config.params
        }
      };
    case "post":
    case "patch":
    case "put":
    case "delete":
      if (!_.has(newData, "_method")) {
        newData = { ...newData, _method: config.method };
      }
      // if (isFormData) {
      // if (!newData.has('_method')) {
      // newData.append('_method', config.method);
      // }
      // } else {
      // newData = qs.stringify(
      // {
      // _method: config.method,
      // ...config.data,
      // },
      // { strictNullHandling: true },
      // );
      // }
      return { ...otherConfig, data: newData, method: "post" };
    default:
      throw new Error(
        "Unhandled interceptor for method of type: ",
        config.method
      );
  }
};

const responseSuccessInterceptor = (response) => Promise.resolve(response);

// eslint-disable-next-line no-unused-vars
const resposeFailedInterceptor = (error, routing = {}) => {
  // silently die when error was due to cancelation of request
  if (axios.isCancel(error)) {
    // a promise which never !!!!!!!!!!!!!

    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {});
  }
  const { response = {} } = error;
  const { data = {} } = response;
  const err = {
    error: data.error,
    message: data.message,
    status: data.status
  };
  // return the promise for further chaining
  return Promise.reject(err || error);
};

const createAPI = (config, routing = {}) => {
  // create an instance as we would with normal axios
  // extract some custom options
  const {
    noInterceptor,
    noRequestInterceptor,
    noResponseInterceptor,
    ...otherConfig
  } = config;
  const instance = axios.create(otherConfig);
  if (noInterceptor) {
    return instance;
  }

  if (!noRequestInterceptor) {
    // intercept the request by adding auth tokens
    instance.interceptors.request.use(
      (request) => requestSuccessInterceptor(request, routing),
      (error) => Promise.reject(error)
    );
  }

  if (!noResponseInterceptor) {
    // intercept the response
    instance.interceptors.response.use(
      (response) => responseSuccessInterceptor(response, routing),
      (error) => resposeFailedInterceptor(error, routing)
    );
  }
  // return the created axios instance
  return instance;
};

export const ajax = (state = {}) => {
  const { router } = state;
  const { baseURL } = axios.defaults;
  axios.withCreate = true;
  return {
    baseURL,
    createAPI: (config) => createAPI(config, router),
    getCancelToken: (cb) => new axios.CancelToken(cb)
  };
};

export default ajax;
