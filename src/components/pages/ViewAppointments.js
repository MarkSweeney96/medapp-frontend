import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import Appointment from "../other/Appointment";
import Axios from "axios";


export default function ViewAppointments(props) {
  const { userData } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  async function getAppointments() {
    const appointmentsRes = await Axios.get("http://localhost:5000/appointments/");
    console.log(appointmentsRes);
    setAppointments(appointmentsRes.data);
  }

  function renderAppointments() {
    return appointments.map((appointment, i) => {
      return <Appointment key={i} appointment={appointment} />

    })
  }

// if the user is logged in display appointments
// if not, display not logged in component
  return (
    <div className="page">
      {userData.user ? (
        <>
        <h3>This is the view appointments page</h3>
        <div className="ViewAppointments">
          {renderAppointments()}
        </div>
        </>
      ) : (
        <>
            <NotLoggedIn />
        </>
      )}
    </div>
  );
}
