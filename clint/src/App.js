import React, { useState } from "react";
import Search from "./component/Search/Search";
import Session from "./component/Session/Session";
import Msg from "./component/successModal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login/Login";
import GetPost from "./component/GetPost/GetPost";
import Header from "./component/Header/header";
import LoginModal from "./component/Header/component/LoginModal/index";

function App() {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.group.loading);
  const [loginModal, setloginModal] = useState(true);
  const handleLoginModal = () => setloginModal(true);
  return (
    <div>
      <Router>
        <Header />
        <Search />
        <Switch>
          <Route
            path="/home"
            component={() => {
              global.window &&
                (global.window.location.href = "https://learnifii.com");
              return null;
            }}
          />
          <Route path="/clubs" exact={true}>
            {!token && handleLoginModal}
            {token ? (
              <>
                <Session />
                <Msg />
              </>
            ) : (
              <LoginModal
                show={loginModal}
                onHide={() => setloginModal(false, "login")}
                type={"login"}
              />
            )}
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
