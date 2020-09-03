import React from "react";
import Search from "./component/Search/Search";
import Session from "./component/Session/Session";
import Msg from "./component/successModal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login/Login";
function App() {
  const token = useSelector((state) => state.group.token);

  return !token ? (
    <Login />
  ) : (
    <div>
      <Router>
        <Switch>
          <Route to="/">
            <Search />
            <Session />
            <Msg />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
