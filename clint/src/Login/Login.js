import React, { useState } from "react";

import { useDispatch } from "react-redux";

import "./Login.css";
import { setUser } from "../Action/actionType";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Category, setCategory] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Email && Password && Category) {
      const data = {
        email: Email,
        password: Password,
        category: Category,
      };
      dispatch(setUser(data));
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <h1>Login Plz</h1>
        <form onSubmit={handleSubmit}>
          <div className="login_form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Type </option>
              <option value="partner">Partner</option>

              <option value="user">User</option>
            </select>
          </div>
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
