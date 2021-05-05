import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import User from "../other/User";
import Axios from "axios";

import { Tile } from 'carbon-components-react';
import { StructuredListWrapper } from 'carbon-components-react';
import { StructuredListHead } from 'carbon-components-react';
import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { StructuredListBody } from 'carbon-components-react';
import { InlineNotification } from 'carbon-components-react';


export default function AdminUsers(props) {
  const { userData } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [editUserData, setEditUserData] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const usersRes = await Axios.get("http://localhost:5000/users/viewall");
    //const usersRes = await Axios.get(`http://localhost:5000/users/findbyid/600706846cb5000c0c8664de`);
    //console.log(usersRes);
    setUsers(usersRes.data);
  }

  function editUser(userData) {
    setEditUserData(userData);

  }

  // function renderUsers() {
  //     return <User getUsers={getUsers} editUser={editUser} editUserData={editUserData} showDeleteNotification={showDeleteNotification} showEditNotification={showEditNotification} />
  // }

  function renderUsers() {
    //sorts users based on the date and time they were created (newest first)
    let sortedUsers = [...users];
    sortedUsers = sortedUsers.sort((a,b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedUsers.map((user, i) => {
      return <User key={i} user={user} getUsers={getUsers} editUser={editUser} editUserData={editUserData} showDeleteNotification={showDeleteNotification} showEditNotification={showEditNotification} />
    })
  }

  // function renderUsers() {
  //     return <User getUsers={getUsers} editUser={editUser} editUserData={editUserData} showDeleteNotification={showDeleteNotification} showEditNotification={showEditNotification} />
  //
  // }

   function showEditNotification() {
    var x = document.getElementById("notificationEdit");
    x.style.display = "block";

}

function showDeleteNotification() {
  var x = document.getElementById("notificationDelete");
  x.style.display = "block";

}

// if the user is logged in display user info
// if not, display not logged in component
  return (
    <div className="page">
      {userData.user ? (
        <>
        <br/><br/><br/>
        <h2><strong>ADMIN - EDIT USER DETAILS</strong></h2><br/>

        <div id="notificationDelete">
          <InlineNotification
            kind="success"
            iconDescription="close"
            subtitle=""
            title="User deleted successfully"
            lowContrast
          />
        </div>
        <div id="notificationEdit">
          <InlineNotification
            kind="success"
            iconDescription="close"
            subtitle=""
            title="User updated successfully"
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
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
          {renderUsers()}
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
