import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import AppointmentDash from "../other/AppointmentDash";
import Axios from "axios";

import { Tile, StructuredListWrapper, StructuredListHead, StructuredListRow, StructuredListCell, StructuredListBody } from 'carbon-components-react';


export default function Dashboard() {
  const { userData } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);

    useEffect(() => {
      getAppointmentsDash();
    }, []);


  function renderAppointmentsDash() {
    //sorts appointments based on the date and time they were greated (newest first)
    let sortedAppointments = [...appointments];
    let topThree = sortedAppointments.reverse().slice(0,3);
    //console.log("top three " + topThree)
    sortedAppointments = sortedAppointments.sort((a,b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return topThree.map((appointment, i) => {
      return <AppointmentDash key={i} appointment={appointment} getAppointmentsDash={getAppointmentsDash}  />
    })
  }

  async function getAppointmentsDash() {
    const appointmentsRes = await Axios.get("http://localhost:5000/appointments/");
    console.log(appointmentsRes);
    setAppointments(appointmentsRes.data);
  }


  let apptsMsg = "";
  let apptsSubHeading = "";
  let numAppts = 0;
    for (let i = 0; i < appointments.length; i++) {
      numAppts++;
    }


    function showApptsDash() {
        if(numAppts == 0) {
            apptsMsg="You have no upcoming appointments";
            apptsSubHeading="";
        }

        else if(numAppts == 1){
          apptsMsg="You have 1 upcoming appointment";
          apptsSubHeading="Your newest appointment can be seen below";
        }

        else if (numAppts == 2){
          apptsMsg="You have 2 upcoming appointments";
          apptsSubHeading="Your newest two appointments can be seen below";
        }

        else if (numAppts == 3){
          apptsMsg="You have 3 upcoming appointments";
          apptsSubHeading="Your newest three appointments can be seen below";
        }

        else if (numAppts > 3){
          apptsMsg="You have " + numAppts + " upcoming appointments";
          apptsSubHeading="Your newest appointments can be seen below. All other appointments can be seen on the 'view my appointments' page.";
        }
        console.log(numAppts);
        console.log(apptsMsg);
      }
    showApptsDash();

// if the user is logged in display a welcome message
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
        <br/>  <br/>  <br/>  <br/>
        <Tile>
            <h4>Welcome, { userData.user.name }</h4>
            <div>
            <h2>{apptsMsg}</h2>
            {apptsSubHeading}
            </div>
        </Tile>
        <br/>
        <div>
        <StructuredListWrapper ariaLabel="Structured list">
      <StructuredListHead>
        <StructuredListRow
          head
          tabIndex={0}
        >
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
            Status
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
      {renderAppointmentsDash()}
      </StructuredListBody>
    </StructuredListWrapper>
        </div>

    <Tile>
        <div>
          <h3>You have X Available Prescription(s)</h3>
        </div>
    </Tile>
    <br/>
    <StructuredListWrapper ariaLabel="Structured list">
  <StructuredListHead>
    <StructuredListRow
      head
      tabIndex={0}
    >
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
        Status
      </StructuredListCell>
    </StructuredListRow>
  </StructuredListHead>
  <StructuredListBody>
    <StructuredListRow tabIndex={0}>
      <StructuredListCell>
        Dr. Alex Karev
      </StructuredListCell>
      <StructuredListCell>
        2021-01-01
      </StructuredListCell>
      <StructuredListCell>
        12:00
      </StructuredListCell>
      <StructuredListCell>
        Waiting for collection
      </StructuredListCell>
    </StructuredListRow>

    <StructuredListRow tabIndex={0}>
      <StructuredListCell>
        Dr. Alex Karev
      </StructuredListCell>
      <StructuredListCell>
        2021-01-01
      </StructuredListCell>
      <StructuredListCell>
        12:00
      </StructuredListCell>
      <StructuredListCell>
        Waiting for collection
      </StructuredListCell>
    </StructuredListRow>

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
