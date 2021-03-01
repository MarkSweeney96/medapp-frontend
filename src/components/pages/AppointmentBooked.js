import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import { Link } from "react-router-dom";
import { Button } from 'carbon-components-react';

export default function AppointmentBooked() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <>
        <br/><br/>
        <h2>Your appointment has been requested and is now <strong>pending</strong>.</h2>
        <h4>Our secretary will update the status to 'confirmed' if the appointment is available.</h4>
        <br/>
        <h4>If you have any queries, please don't hesitate to contact our secretary
         at:<br/>
        secretary@medapp.com or on 01 123 4567</h4>
         <br/>
         <h4>Click 'View my appointments' below to see all your appointments and their status.</h4>
         <br/>


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
