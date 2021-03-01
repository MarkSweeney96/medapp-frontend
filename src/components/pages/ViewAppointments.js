import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import Appointment from "../other/Appointment";
//import EditAppointment from "../pages/EditAppointment";
import Axios from "axios";

import { Tile } from 'carbon-components-react';
import { StructuredListWrapper } from 'carbon-components-react';
import { StructuredListHead } from 'carbon-components-react';
import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { StructuredListBody } from 'carbon-components-react';
import { InlineNotification } from 'carbon-components-react';


export default function ViewAppointments(props) {
  const { userData } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [editAppointmentData, setEditAppointmentData] = useState(null);

  useEffect(() => {
    getAppointments();
  }, []);

  async function getAppointments() {
    const appointmentsRes = await Axios.get("http://localhost:5000/appointments/");
    console.log(appointmentsRes);
    setAppointments(appointmentsRes.data);
  }

  function editAppointment(appointmentData) {
    setEditAppointmentData(appointmentData);

  }

  function renderAppointments() {
    //sorts appointments based on the date and time they were greated (newest first)
    let sortedAppointments = [...appointments];
    sortedAppointments = sortedAppointments.sort((a,b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedAppointments.map((appointment, i) => {
      return <Appointment key={i} appointment={appointment} getAppointments={getAppointments} editAppointment={editAppointment} editAppointmentData={editAppointmentData} showDeleteNotification={showDeleteNotification} showEditNotification={showEditNotification} />
    })
  }

   function showEditNotification() {
    var x = document.getElementById("notificationEdit");
    x.style.display = "block";

}

function showDeleteNotification() {
  var x = document.getElementById("notificationDelete");
  x.style.display = "block";

}

// if the user is logged in display appointments
// if not, display not logged in component
  return (
    <div className="page">
      {userData.user ? (
        <>
        <br/><br/><br/>
        <h2>View appointments</h2><br/>

        <div id="notificationDelete">
          <InlineNotification
            kind="success"
            iconDescription="close"
            subtitle=""
            title="Appointment deleted successfully"
            lowContrast
          />
        </div>
        <div id="notificationEdit">
          <InlineNotification
            kind="success"
            iconDescription="close"
            subtitle=""
            title="Appointment updated successfully"
            lowContrast
          />
        </div>


        <StructuredListWrapper ariaLabel="Structured list">
      <StructuredListHead>
        <StructuredListRow
          head
          tabIndex={0}
        >
          <StructuredListCell head>
            Patient
          </StructuredListCell>
          <StructuredListCell head>
            Medical Professional
          </StructuredListCell>
          <StructuredListCell head>
            Date
          </StructuredListCell>
          <StructuredListCell head>
            Time
          </StructuredListCell>
          <StructuredListCell head>
            Symptoms
          </StructuredListCell>
          <StructuredListCell head>
            Notes
          </StructuredListCell>
          <StructuredListCell head>
            Status
          </StructuredListCell>
          <StructuredListCell head>
            Edit
          </StructuredListCell>
          <StructuredListCell head>
            Delete
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
          {renderAppointments()}
      </StructuredListBody>
    </StructuredListWrapper>
        </>
      ) : (
        <>
            <NotLoggedIn />
        </>
      )}
    </div>
  );
}
