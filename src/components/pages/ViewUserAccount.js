import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import UserInfo from "../other/UserInfo";
//import EditAppointment from "../pages/EditAppointment";
import Axios from "axios";

import { Tile } from 'carbon-components-react';
import { StructuredListWrapper } from 'carbon-components-react';
import { StructuredListHead } from 'carbon-components-react';
import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { StructuredListBody } from 'carbon-components-react';
import { InlineNotification } from 'carbon-components-react';


export default function ViewUserAccount(props) {
  const { userData } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [editUserData, setEditUserData] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    //const appointmentsRes = await Axios.get("http://localhost:5000/appointments/");
    //console.log(userData);
    //console.log(appointmentsRes);
    setUser(userData);
  }

  function editUser(userData) {
    setEditUserData(userData);

  }

  function renderUser() {
      return <UserInfo user={user} getUser={getUser} editUser={editUser} editUserData={editUserData} showEditNotification={showEditNotification} />

  }

   function showEditNotification() {
    var x = document.getElementById("notificationEdit");
    x.style.display = "block";

}
// if the user is logged in display appointments
// if not, display not logged in component
  return (
    <div className="page">
      {userData.user ? (
        <>
        <br/><br/><br/>
        <h2>View my user info</h2><br/>

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
            Email
          </StructuredListCell>
          <StructuredListCell head>
            Name
          </StructuredListCell>
          <StructuredListCell head>
            Address
          </StructuredListCell>
          <StructuredListCell head>
            Phone
          </StructuredListCell>
          <StructuredListCell head>
            Edit
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
          {renderUser()}
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
