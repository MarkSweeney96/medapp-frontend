import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorMsg from "../other/ErrorMsg";

import { Form } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { InlineNotification } from 'carbon-components-react';
import { NotificationActionButton } from 'carbon-components-react';

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
      err.response.data && setError(err.response.data);
    }

  };

  //{error &&... if there is an error create error message with error text from backend
  // clear error function resets error message to undefined
  return (
    <div className="page">
      <h2>Register</h2>
      <Form className="form" onSubmit={submit}>
      <TextInput
        id="register-email"
        type="email"
        placeholder="Email"
        helperText="Enter your email address"
        //sets email state to whatever is inputted into the email field
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput.PasswordInput
        id="register-password"
        hidePasswordLabel="Hide password"
        showPasswordLabel="Show password"
        placeholder="Password"
        helperText="Enter your password"
        //sets password state to whatever is inputted into the password field
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput.PasswordInput
        id="password"
        hidePasswordLabel="Hide password"
        showPasswordLabel="Show password"
        placeholder="Verify Password"
        helperText="Verify your password"
        //sets verify password state to whatever is inputted into the verify password field
        onChange={(e) => setPasswordCheck(e.target.value)}
      />

      <TextInput
        id="register-name"
        type="text"
        placeholder="Name"
        helperText="Enter your name"
        //sets name state to whatever is inputted into the name field
        onChange={(e) => setName(e.target.value)}
      />

      <TextInput
        id="register-address"
        type="text"
        placeholder="Address"
        helperText="Enter your address"
        //sets address state to whatever is inputted into the address field
        onChange={(e) => setAddress(e.target.value)}
      />

      <TextInput
        id="register-phone"
        type="text"
        placeholder="Phone"
        helperText="Enter your phone number"
        //sets phone state to whatever is inputted into the phone field
        onChange={(e) => setPhone(e.target.value)}
      />

      <Button id="form-btn" type="submit" value="Register">
        Register
      </Button>
      </Form>
    </div>
  );
}
