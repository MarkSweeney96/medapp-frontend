import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import Axios from "axios";
import QRCode from "qrcode.react";

import { Form } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Select } from 'carbon-components-react';
import { SelectItem } from 'carbon-components-react';
import { TextArea } from 'carbon-components-react';
import { ModalFooter } from 'carbon-components-react';


export default function EditPrescriptionStatus({ prescription, editPrescription, editPrescriptionData, setOpen }) {
  const { userData } = useContext(UserContext);

  // edit form state
  const [editorId, setEditorId] = useState("");
  const [editorPatient, setEditorPatient] = useState("");
  const [editorDoctor, setEditorDoctor] = useState("");
  const [editorDate, setEditorDate] = useState("");
  const [editorTime, setEditorTime] = useState("");
  const [editorMedication, setEditorMedication] = useState("");
  const [editorNotes, setEditorNotes] = useState("");
  const [editorComplete, setEditorComplete] = useState("");


  useEffect(() => {
    if (editPrescriptionData) {
      setEditorId(editPrescriptionData._id);
      setEditorPatient(editPrescriptionData.patient);
      setEditorDoctor(editPrescriptionData.doctor);
      setEditorDate(editPrescriptionData.date);
      setEditorTime(editPrescriptionData.time);
      setEditorMedication(editPrescriptionData.medication);
      setEditorNotes(editPrescriptionData.notes);
      setEditorComplete(editPrescriptionData.complete);
    }

  }, [editPrescriptionData]);

  async function savePrescription(e){
    e.preventDefault();

    const prescriptionData = {
      _id: editorId,
      patient: editorPatient,
      doctor: editorDoctor,
      date: editorDate,
      time: editorTime,
      medication: editorMedication,
      notes: editorNotes,
      complete: editorComplete
    }
    await Axios.put(`http://localhost:5000/prescriptions/edit/${editPrescriptionData._id}`, prescriptionData);

    setEditorId("");
    setEditorPatient("");
    setEditorDoctor("");
    setEditorDate("");
    setEditorTime("");
    setEditorMedication("");
    setEditorNotes("");
    setEditorComplete("");

    //showEditNotification();

  }

// if the user is logged in display a book appointment form
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
        <div id="editForm" className="prescription-editer">
          <Form onSubmit={savePrescription}>
          <Select
              defaultValue=""
              id="editor-complete"
              invalidText=""
              labelText=""
              helperText=""
              value={editorComplete}
              onChange={(e) => setEditorComplete(e.target.value)}
            >
              <SelectItem
                text="Pick Status (Yes or No)"
                value=""
              />
              <SelectItem
                text="Yes"
                value="Yes"
              />
              <SelectItem
                text="No"
                value="No"
              />
          </Select>

          <p>This Prescription is for {editorPatient} from Dr. {editorDoctor}</p>
          <p><em>They were prescribed <strong>{editorMedication}</strong></em></p>
          <p><strong>Make sure you tell them the following: <u>{editorNotes}</u></strong></p>
          <br/>

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
            Update Status
          </Button>


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
