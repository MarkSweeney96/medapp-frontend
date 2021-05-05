import React, { useContext, useState, useEffect } from 'react';
import Axios from "axios";
import UserContext from "../../context/UserContext";

import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Modal, ModalHeader, ComposedModal, ModalTitle, ModalBody, ModalFooter } from 'carbon-components-react';

import EditUser from "../pages/EditUser";

export default function User({ user, getUsers, editUser, editUserData, showEditNotification, showDeleteNotification }) {

const [open, setOpen] = useState(false);
const [open_del, setOpenDel] = useState(false);
const { userData } = useContext(UserContext);

  async function editUserBtn() {
    editUser(user);
    setOpen(true);
  }

  // async function deleteUserBtn() {
  //   setOpenDel(true);
  // }


  return (
        <StructuredListRow tabIndex={0}>
          <StructuredListCell>
            {user.email}
          </StructuredListCell>
          <StructuredListCell>
            {user.name}
          </StructuredListCell>
          <StructuredListCell>
            {user.address}
          </StructuredListCell>
          <StructuredListCell>
            {user.phone}
          </StructuredListCell>
          <StructuredListCell>
          <Button kind='primary' onClick={editUserBtn}>Edit</Button>

          <ComposedModal open={open} onClose={() => setOpen(false)}
          size="sm"
          >
          <ModalHeader label="">
            <h2>
              Edit User
            </h2>
          </ModalHeader>
          <ModalBody>
            <EditUser
              editUserData={editUserData}
              getUsers={getUsers}
              showEditNotification={showEditNotification}
              setOpen={setOpen}
              />
          </ModalBody>

          </ComposedModal>

          </StructuredListCell>
        </StructuredListRow>
  );
}
