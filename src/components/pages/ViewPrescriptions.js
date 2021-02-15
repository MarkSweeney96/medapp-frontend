import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

import { Button } from 'carbon-components-react';


export default function ViewPrescriptions() {
  const { userData } = useContext(UserContext);

// if the user is logged in display a welcome message
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
        <h3>This is the view prescriptions page</h3>
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
