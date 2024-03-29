import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import Axios from "axios";
import ErrorMsg from "../other/ErrorMsg";

//import { Tile } from 'carbon-components-react';
import { Form } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Select } from 'carbon-components-react';
import { SelectItem } from 'carbon-components-react';
import { TextArea } from 'carbon-components-react';
import { ModalFooter } from 'carbon-components-react';
import { InlineNotification } from 'carbon-components-react';
import { NotificationActionButton } from 'carbon-components-react';



export default function EditUser({ getUsers, editUserData, showEditNotification, setOpen }) {
  const { userData } = useContext(UserContext);
  const [editorEmail, setEditorEmail] = useState("");
  const [editorName, setEditorName] = useState("");
  const [editorAddress, setEditorAddress] = useState("");
  const [editorPhone, setEditorPhone] = useState("");
  const [error, setError] = useState();


  useEffect(() => {
    if (editUserData) {
      setEditorEmail(editUserData.email);
      setEditorName(editUserData.name);
      setEditorAddress(editUserData.address);
      setEditorPhone(editUserData.phone);
    }

  }, [editUserData]);

  async function saveUser(e){
    e.preventDefault();

    try {
      const userData = {
        email: editorEmail,
        name: editorName,
        address: editorAddress,
        phone: editorPhone
      }
      await Axios.put(`http://localhost:5000/users/edit/${editUserData._id}`, userData);

      setEditorEmail("");
      setEditorName("");
      setEditorAddress("");
      setEditorPhone("");

      showEditNotification();
      getUsers();
    } catch(err) {
      //sets error message if there is one to display from the backend
      err.response.data.msg && setError(err.response.data.msg);
    }

  }



// if the user is logged in display a book appointment form
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
          <span><strong>EDIT USER</strong></span>
          {error && (
            <ErrorMsg
              message= {
                <InlineNotification
                  lowContrast
                  hideCloseButton
                  kind="error"
                  actions={<NotificationActionButton>Clear</NotificationActionButton>}
                  iconDescription="close error message"
                  title={error}
                />
              }
            clearError={() => setError(undefined) }
            />
          )}
        <div id="editForm" className="user-editer">
          <Form onSubmit={saveUser}>
          <TextInput
            id="editor-email"
            type="text"
            placeholder=""
            labelText="Email"
            helperText=""
            value={editorEmail}
            onChange={(e) => setEditorEmail(e.target.value)}
          />
          <br/>

          <TextInput
            id="editor-name"
            type="text"
            placeholder=""
            labelText="Name"
            helperText=""
            value={editorName}
            onChange={(e) => setEditorName(e.target.value)}
          />
          <br/>

          <TextInput
            id="editor-address"
            type="text"
            placeholder=""
            labelText="Address"
            helperText=""
            value={editorAddress}
            onChange={(e) => setEditorAddress(e.target.value)}
          />
          <br/>

          <TextInput
            id="editor-phone"
            type="text"
            placeholder=""
            labelText="Phone"
            helperText=""
            value={editorPhone}
            onChange={(e) => setEditorPhone(e.target.value)}
          />

          <br/>

          <ModalFooter>
          <Button
            kind="secondary"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button
            kind="primary"
            type="submit"
            onClick={() => setOpen(false)}
            >
            Update User
          </Button>
          </ModalFooter>

          </Form>

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
