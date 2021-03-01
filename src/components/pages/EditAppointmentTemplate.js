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



export default function EditAppointment({ getAppointments, editAppointmentData, showEditNotification, setOpen }) {
  const { userData } = useContext(UserContext);
  const [editorPatient, setEditorPatient] = useState("");
  const [editorDoctorNurse, setEditorDoctorNurse] = useState("");
  const [editorDate, setEditorDate] = useState("");
  const [editorTime, setEditorTime] = useState("");
  const [editorSymptoms, setEditorSymptoms] = useState("");
  const [editorNotes, setEditorNotes] = useState("");
  const [editorStatus, setEditorStatus] = useState("");


  useEffect(() => {
    if (editAppointmentData) {
      setEditorPatient(editAppointmentData.patient);
      setEditorDoctorNurse(editAppointmentData.doctor_nurse);
      setEditorDate(editAppointmentData.date);
      setEditorTime(editAppointmentData.time);
      setEditorSymptoms(editAppointmentData.symptoms);
      setEditorNotes(editAppointmentData.notes);
      setEditorStatus(editAppointmentData.status);
    }

  }, [editAppointmentData]);

  async function saveAppointment(e){
    e.preventDefault();

    const appointmentData = {
      patient: editorPatient,
      doctor_nurse: editorDoctorNurse,
      date: editorDate,
      time: editorTime,
      symptoms: editorSymptoms ? editorSymptoms : "Not provided",
      notes: editorNotes ? editorNotes : "Not provided",
      status: editorStatus
    }
    await Axios.put(`http://localhost:5000/appointments/edit/${editAppointmentData._id}`, appointmentData);

    setEditorPatient("");
    setEditorDoctorNurse("");
    setEditorDate("");
    setEditorTime("");
    setEditorSymptoms("");
    setEditorNotes("");
    setEditorStatus("");

    showEditNotification();
    getAppointments();

  }



// if the user is logged in display a book appointment form
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
          <span><strong>TEMPLATE VERSION OF THE EDIT FORM (EDIT ALL FIELDS)</strong></span>
        <div id="editForm" className="appointment-editer">
          <Form onSubmit={saveAppointment}>
          <TextInput
            id="editor-patinet"
            type="text"
            placeholder=""
            labelText="Patient"
            helperText=""
            value={editorPatient}
            onChange={(e) => setEditorPatient(e.target.value)}
          />
          <br/>

          <TextInput
            id="editor-doctor_nurse"
            type="text"
            placeholder=""
            labelText="Medical Professional"
            helperText="Enter your doctor or nurse's name"
            value={editorDoctorNurse}
            onChange={(e) => setEditorDoctorNurse(e.target.value)}
          />
          <br/>

          <TextInput
            id="editor-date"
            type="text"
            placeholder="YYYY-MM-DD"
            labelText="Date"
            helperText=""
            value={editorDate}
            onChange={(e) => setEditorDate(e.target.value)}
          />
          <br/>

          <TextInput
            id="editor-time"
            type="text"
            placeholder="00:00"
            labelText="Time"
            helperText=""
            value={editorTime}
            onChange={(e) => setEditorTime(e.target.value)}
          />
          <br/>

          <TextInput
            id="editor-symptoms"
            type="text"
            placeholder="Enter symptoms here..."
            labelText="Symptoms (optional)"
            helperText="Enter any symptoms you have"
            value={editorSymptoms}
            onChange={(e) => setEditorSymptoms(e.target.value)}
          />
          <br/>

          <TextArea
            id="editor-notes"
            type="text"
            placeholder="Enter notes here..."
            labelText="Notes (optional)"
            helperText="Enter any additional notes for your nurse / doctor"
            value={editorNotes}
            onChange={(e) => setEditorNotes(e.target.value)}
          />
          <br/>

          <Select
              defaultValue=""
              id="editor-status"
              invalidText=""
              labelText="Appointment Status"
              helperText=""
              value={editorStatus}
              onChange={(e) => setEditorStatus(e.target.value)}
            >
              <SelectItem
                text="Pick Status"
                value=""
              />
              <SelectItem
                text="Pending"
                value="pending"
              />
              <SelectItem
                text="Confirmed"
                value="confirmed"
              />
              <SelectItem
                text="Cancelled"
                value="cancelled"
              />
          </Select>

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
            Update Appointment
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
