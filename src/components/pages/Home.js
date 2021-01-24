import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Home() {
  const { userData } = useContext(UserContext);

// if the user is logged in display a welcome message
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
        <h1>Welcome { userData.user.name }</h1>
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login"> Login </Link>
        </>
      )}
    </div>
  );
}
