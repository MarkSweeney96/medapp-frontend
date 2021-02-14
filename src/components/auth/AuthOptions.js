import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Button } from 'carbon-components-react';

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  // logout function to remove auth token from localStorage when executed
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem("auth-token", "")
  };
  return (
    <nav className="auth-options">
      {
        //checks for value of user, if not null
        //or undefined display logout button
        userData.user ? (
          <div><Button kind='ghost' onClick={logout}>Log out</Button></div>
        ) : (
          //otherwise display a register and login button
          <>
              <div><Button kind='ghost' onClick={register}>Register</Button></div>
            <div><Button kind='ghost' onClick={login} >Login</Button></div>
          </>
        )}
    </nav>
  );
}
