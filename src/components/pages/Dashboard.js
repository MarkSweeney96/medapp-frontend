import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

import { Button } from 'carbon-components-react';


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
          <h2>You are not logged in</h2>
          <Link to="/login"> <Button>Login</Button> </Link>
        </>
      )}
    </div>
  );
}
