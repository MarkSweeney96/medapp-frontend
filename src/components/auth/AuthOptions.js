import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

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
          <button onClick={logout}>Log out</button>
        ) : (
          //otherwise display a register and login button
          <>
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
          </>
        )}
    </nav>
  );
}
