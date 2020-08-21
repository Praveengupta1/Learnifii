import React from "react";
import Search from "../component/Search";
import Session from "../component/Session";
import Msg from "../component/successModal";
import { Provider } from "react-redux";
import store from "../store";
function App() {
  return (
    <Provider store={store}>
      <Search />
      <Session />
      <Msg />
    </Provider>
  );
}

export default App;
