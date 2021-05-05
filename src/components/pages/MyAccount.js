import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";

import { Tile, StructuredListWrapper, StructuredListBody, StructuredListRow, StructuredListCell, Button } from 'carbon-components-react';


export default function MyAccount() {
  const { userData } = useContext(UserContext);

// if the user is logged in display a welcome message
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
        <br/><br/><br/><br/>
        <Tile><h2>My Account</h2></Tile><br/>
        <StructuredListWrapper ariaLabel="Structured list">
      <StructuredListBody>

        <StructuredListRow tabIndex={0}>
          <StructuredListCell>
            Name
          </StructuredListCell>
          <StructuredListCell>
            { userData.user.name }
          </StructuredListCell>
        </StructuredListRow>

        <StructuredListRow tabIndex={0}>
          <StructuredListCell>
            Email
          </StructuredListCell>
          <StructuredListCell>
            { userData.user.email }
          </StructuredListCell>
        </StructuredListRow>

        <StructuredListRow tabIndex={0}>
          <StructuredListCell>
            Address
          </StructuredListCell>
          <StructuredListCell>
            { userData.user.address }
          </StructuredListCell>
        </StructuredListRow>

        <StructuredListRow tabIndex={0}>
          <StructuredListCell>
            Phone
          </StructuredListCell>
          <StructuredListCell>
            { userData.user.phone }
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
