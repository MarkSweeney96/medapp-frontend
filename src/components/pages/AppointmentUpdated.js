import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import { Link } from "react-router-dom";
import { Button } from 'carbon-components-react';

export default function AppointmentUpdated() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <>
        <h2>Your appointment was successfully updated</h2>
        <Link to="/viewappointments"> <Button>View my appointments</Button> </Link>
        </>
      ) : (
        <>
          <NotLoggedIn />
        </>
      )}
    </div>
  );
}
