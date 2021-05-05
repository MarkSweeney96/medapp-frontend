import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import AppointmentDash from "../other/AppointmentDash";
import PrescriptionDash from "../other/PrescriptionDash";
import Axios from "axios";

import { Tile, StructuredListWrapper, StructuredListHead, StructuredListRow, StructuredListCell, StructuredListBody } from 'carbon-components-react';


export default function Dashboard() {
  const { userData } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
      getAppointmentsDash();
      getPrescriptionsDash();
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

  function renderPrescriptionsDash() {
    //sorts prescriptions based on the date and time they were greated (newest first)
    let sortedPrescriptions = [...prescriptions];
    let topThree = sortedPrescriptions.reverse().slice(0,3);
    //console.log("top three " + topThree)
    sortedPrescriptions = sortedPrescriptions.sort((a,b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return topThree.map((prescription, i) => {
      return <PrescriptionDash key={i} prescription={prescription} getPrescriptionsDash={getPrescriptionsDash}  />
    })
  }

  async function getAppointmentsDash() {
    const appointmentsRes = await Axios.get("http://localhost:5000/appointments/");
    console.log(appointmentsRes);
    setAppointments(appointmentsRes.data);
  }

  async function getPrescriptionsDash() {
    const prescriptionsRes = await Axios.get("http://localhost:5000/prescriptions/");
    console.log(prescriptionsRes);
    setPrescriptions(prescriptionsRes.data);
  }

  let apptsMsg = "";
  let apptsSubHeading = "";
  let numAppts = 0;
    for (let i = 0; i < appointments.length; i++) {
      numAppts++;
    }

    let prescMsg = "";
    let prescSubHeading = "";
    let numPresc = 0;
      for (let i = 0; i < prescriptions.length; i++) {
        numPresc++;
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


      function showPrescDash() {
          if(numPresc == 0) {
              prescMsg="You have no prescriptions available";
              prescSubHeading="";
          }

          else if(numPresc == 1){
            prescMsg="You have 1 prescription available";
            prescSubHeading="Your newest prescription can be seen below";
          }

          else if (numPresc == 2){
            prescMsg="You have 2 prescriptions available";
            prescSubHeading="Your newest two prescriptions can be seen below";
          }

          else if (numPresc == 3){
            prescMsg="You have 3 prescriptions available";
            prescSubHeading="Your newest three prescriptions can be seen below";
          }

          else if (numPresc > 3){
            prescMsg="You have " + numPresc + " prescriptions available";
            prescSubHeading="Your newest prescriptions can be seen below. All other prescriptions can be seen on the 'view my prescriptions' page.";
          }
          console.log(numPresc);
          console.log(prescMsg);
        }

    showApptsDash();
    showPrescDash();

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
        <h2>{prescMsg}</h2>
        {prescSubHeading}
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
        Complete
      </StructuredListCell>
    </StructuredListRow>
  </StructuredListHead>
  <StructuredListBody>
  {renderPrescriptionsDash()}

  </StructuredListBody>
</StructuredListWrapper>
        </>
      ) : (
        <>
        <div>
          <NotLoggedIn />
        </div>
        </>
      )}
    </div>
  );
}
