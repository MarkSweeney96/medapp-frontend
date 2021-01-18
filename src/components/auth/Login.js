import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Login() {
  // set state for each input value in login form
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const loginUser = { email, password };
    const loginRes = await Axios.post(
      "http://localhost:5000/users/login",
      loginUser
    );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <form className="form" onSubmit={submit}>
      <label htmlFor="login-email">Email</label>
      <input
        id="login-email"
        type="email"
        //sets email state to whatever is inputted into the email field
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="login-password">Password</label>
      <input
        id="login-password"
        type="password"
        //sets password state to whatever is inputted into the password field
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Login" />
      </form>
    </div>
  );
}
