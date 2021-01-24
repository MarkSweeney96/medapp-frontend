import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorMsg from "../other/ErrorMsg";

export default function Register() {
  // set state for each input value in register form
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, name, address, phone };
      await Axios.post(
        "http://localhost:5000/users/register",
        newUser
      );
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login", {
          email,
          password,
        });
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    } catch(err) {
      //sets error message if there is one to display from the backend
      err.response.data.msg && setError(err.response.data.msg);
    }

  };
  //{error &&... if there is an error create error message with error text from backend
  // clear error function resets error message to undefined
  return (
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorMsg message={error} clearError={() => setError(undefined) } />
      )}
      <form className="form" onSubmit={submit}>
      <label htmlFor="register-email">Email</label>
      <input
        id="register-email"
        type="email"
        //sets email state to whatever is inputted into the email field
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="register-password">Password</label>
      <input
        id="register-password"
        type="password"
        //sets password state to whatever is inputted into the password field
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        id="password"
        type="password"
        placeholder="Verify password"
        //sets verify password state to whatever is inputted into the verify password field
        onChange={(e) => setPasswordCheck(e.target.value)}
      />

      <label htmlFor="register-name">Name</label>
      <input
        id="register-name"
        type="text"
        //sets name state to whatever is inputted into the name field
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="register-address">Address</label>
      <input
        id="register-address"
        type="text"
        //sets address state to whatever is inputted into the address field
        onChange={(e) => setAddress(e.target.value)}
      />

      <label htmlFor="register-phone">Phone</label>
      <input
        id="register-phone"
        type="text"
        //sets phone state to whatever is inputted into the phone field
        onChange={(e) => setPhone(e.target.value)}
      />

      <input type="submit" value="Register" />
      </form>
    </div>
  );
}
