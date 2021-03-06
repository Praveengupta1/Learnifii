import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assests/index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import dotenv from "dotenv";
dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
