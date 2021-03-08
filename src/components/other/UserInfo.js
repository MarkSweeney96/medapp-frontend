import React, { useContext, useState, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import Axios from "axios";

import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Modal, ModalHeader, ComposedModal, ModalTitle, ModalBody, ModalFooter } from 'carbon-components-react';

import EditUser from "../pages/EditUser";

export default function UserInfo({ user, getUser, editUser, editUserData, showEditNotification }) {

const { userData } = useContext(UserContext);
const [open, setOpen] = useState(false);



  async function editUserBtn() {
    editUser(user);
    setOpen(true);
  }


  return (
        <StructuredListRow tabIndex={0}>
          <StructuredListCell>
            {userData.user.name}
          </StructuredListCell>
          <StructuredListCell>
            {userData.user.email}
          </StructuredListCell>
          <StructuredListCell>
            {userData.user.address}
          </StructuredListCell>
          <StructuredListCell>
            {userData.user.phone}
          </StructuredListCell>

          <StructuredListCell>

          <Button kind='primary' onClick={editUserBtn}>Edit my info</Button>


          <ComposedModal open={open} onClose={() => setOpen(false)}
          size="sm"
          >
          <ModalHeader label="">
            <h2>
              Edit my info
            </h2>
          </ModalHeader>
          <ModalBody>
            <EditUser
              editUserData={editUserData}
              getUser={getUser}
              showEditNotification={showEditNotification}
              setOpen={setOpen}
              />
          </ModalBody>

          </ComposedModal>

          </StructuredListCell>

        </StructuredListRow>
  );
}
