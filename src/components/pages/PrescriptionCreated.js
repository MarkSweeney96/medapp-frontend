import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import { Link } from "react-router-dom";
import { Button } from 'carbon-components-react';

export default function PrescriptionCreated() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <>
        <br/><br/>
        <h2>Your prescription has been created successfully.</h2>
         <br/>
         <h4>Click 'View my prescriptions' below to see all your prescriptions.</h4>
         <br/>


        <Link to="/viewprescriptions"> <Button>View my prescriptions</Button> </Link>
        </>
      ) : (
        <>
          <NotLoggedIn />
        </>
      )}
    </div>
  );
}
