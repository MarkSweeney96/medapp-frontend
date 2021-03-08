import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import Axios from "axios";

//import { Tile } from 'carbon-components-react';
import { Form } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Select } from 'carbon-components-react';
import { SelectItem } from 'carbon-components-react';
import { TextArea } from 'carbon-components-react';
import { ModalFooter } from 'carbon-components-react';
//import { DatePicker } from 'carbon-components-react';
//import { DatePickerInput } from 'carbon-components-react';



export default function EditUser({ getUser, editUserData, showEditNotification, setOpen }) {
  const { userData } = useContext(UserContext);
  const [editorEmail, setEditorEmail] = useState("");
  const [editorPassword, setEditorPassword] = useState("");
  const [editorPasswordCheck, setEditorPasswordCheck] = useState("");
  const [editorName, setEditorName] = useState("");
  const [editorAddress, setEditorAddress] = useState("");
  const [editorPhone, setEditorPhone] = useState("");


  useEffect(() => {
    if (editUserData) {

      setEditorEmail(editorEmail);
      //setEditorPassword(editUserData.password);
      //setEditorPasswordCheck(editUserData.password_check);
      setEditorName(editorName);
      setEditorAddress(editorAddress);
      setEditorPhone(editorPhone);
    }

  }, [editUserData]);

  async function saveUser(e){
    e.preventDefault();

    const userData = {
      email: editorEmail,
      password: "secret",
      passwordCheck: "secret",
      name: editorName,
      address: editorAddress,
      phone: editorPhone
    }
    await Axios.put(`http://localhost:5000/users/edit/${editUserData._id}`, userData);

    setEditorEmail("");
    setEditorPassword("");
    setEditorPasswordCheck("");
    setEditorName("");
    setEditorAddress("");
    setEditorPhone("");

    //showEditNotification();

  }



// if the user is logged in display a book appointment form
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
          <span><strong>EDIT USER { userData.user.id } { userData.user.name }</strong></span>
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

          <TextArea
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
            Update My Info
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
