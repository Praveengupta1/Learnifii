import React from "react";
import Search from "../component/Search";
import Session from "../component/Session";

import { Provider } from "react-redux";
import store from "../store";
function App() {
  return (
    <Provider store={store}>
      <Search />
      <Session />
      {/* <Follower /> */}
      {/*  <Posts />
      <Cards /> */}
    </Provider>
  );
}

export default App;
