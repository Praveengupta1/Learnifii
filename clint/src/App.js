import React from "react";
import Search from "./component/Search/Search";
import Session from "./component/Session/Session";
import Msg from "./component/successModal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login/Login";
import GetPost from "./component/GetPost/GetPost";
function App() {
  const token = useSelector((state) => state.group.token);
  const user = useSelector((state) => state.group.user);
  const loading = useSelector((state) => state.group.loading);

  return !token ? (
    <Login />
  ) : (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Search />
            <Session />
            <Msg />
          </Route>

          <Route path="/group/:groupId/:postId">
            <GetPost token={token} user={user} loading={loading} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
