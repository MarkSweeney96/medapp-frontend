import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";


export default function Dashboard() {
  const { userData } = useContext(UserContext);

// if the user is logged in display a welcome message
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
        <h1>Welcome { userData.user.name }</h1>
        <h3>This is your user dashboard</h3>
        </>
      ) : (
        <>
          <NotLoggedIn />
        </>
      )}
    </div>
  );
}
