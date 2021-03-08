import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import Prescription from "../other/Prescription";
import Axios from "axios";


import { Tile } from 'carbon-components-react';
import { StructuredListWrapper } from 'carbon-components-react';
import { StructuredListHead } from 'carbon-components-react';
import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { StructuredListBody } from 'carbon-components-react';
import { InlineNotification } from 'carbon-components-react';


export default function ViewPrescriptions() {
  const { userData } = useContext(UserContext);
  const [prescriptions, setPrescriptions] = useState([]);
  const [editPrescriptionData, setEditPrescriptionData] = useState(null);

  useEffect(() => {
    getPrescriptions();
  }, []);

  async function getPrescriptions() {
    const prescriptionsRes = await Axios.get("http://localhost:5000/prescriptions/");
    console.log(prescriptionsRes);
    setPrescriptions(prescriptionsRes.data);
  }

  function editPrescription(prescriptionData) {
    setEditPrescriptionData(prescriptionData);

  }

  function renderPrescriptions() {
    //sorts prescriptions based on the date and time they were created (newest first)
    let sortedPrescriptions = [...prescriptions];
    sortedPrescriptions = sortedPrescriptions.sort((a,b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedPrescriptions.map((prescription, i) => {
      return <Prescription key={i} prescription={prescription} getPrescriptions={getPrescriptions} editPrescription={editPrescription} editPrescriptionData={editPrescriptionData} showDeleteNotification={showDeleteNotification} showEditNotification={showEditNotification} />
    })
  }

function showDeleteNotification() {
  var x = document.getElementById("notificationDelete");
  x.style.display = "block";

}

function showEditNotification() {
 var x = document.getElementById("notificationEdit");
 x.style.display = "block";

}

// if the user is logged in display a welcome message
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
        <br/><br/><br/>
        <h2>View prescriptions</h2><br/>

        <div id="notificationDelete">
          <InlineNotification
            kind="success"
            iconDescription="close"
            subtitle=""
            title="Prescription deleted successfully"
            lowContrast
          />
        </div>
        <div id="notificationEdit">
          <InlineNotification
            kind="success"
            iconDescription="close"
            subtitle=""
            title="Prescription status updated successfully"
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
            Doctor
          </StructuredListCell>
          <StructuredListCell head>
            Date
          </StructuredListCell>
          <StructuredListCell head>
            Time
          </StructuredListCell>
          <StructuredListCell head>
            Medication
          </StructuredListCell>
          <StructuredListCell head>
            Notes
          </StructuredListCell>
          <StructuredListCell head>
            Complete
          </StructuredListCell>
          <StructuredListCell head>
            View
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
          {renderPrescriptions()}
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
