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


export default function Login() {
  // set state for each input value in login form
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
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
    } catch(err) {
      //sets error message if there is one to display from the backend
      err.response.data.msg && setError(err.response.data.msg);
    }

  };

  //{error &&... if there is an error create error message with error text from backend
  // clear error function resets error message to undefined
  return (
    <div className="page">
      <h2>Login</h2>
      {error && (
        <ErrorMsg
          message= {
            <InlineNotification
              lowContrast
              hideCloseButton
              kind="error"
              actions={<NotificationActionButton>Clear</NotificationActionButton>}
              iconDescription="close error message"
              title={error}
            />
          }
        clearError={() => setError(undefined) }
        />
      )}
      <Form className="form" onSubmit={submit}>
      <TextInput
        id="login-email"
        type="email"
        placeholder="Email"
        helperText="Enter your email address"
        //sets email state to whatever is inputted into the email field
        onChange={(e) => setEmail(e.target.value)}
      />


      <TextInput.PasswordInput
        id="login-password"
        placeholder="Password"
        helperText="Enter your password"
        //sets password state to whatever is inputted into the password field
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button id="form-btn" type="submit" value="Login">
        Login
      </Button>
      </Form>
    </div>
  );
}
