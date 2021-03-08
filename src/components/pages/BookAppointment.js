import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import Axios from "axios";

import { Tile } from 'carbon-components-react';
import { Form } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Select } from 'carbon-components-react';
import { SelectItem, SelectItemGroup } from 'carbon-components-react';
import { TextArea } from 'carbon-components-react';
// import { DatePicker } from 'carbon-components-react';
// import { DatePickerInput } from 'carbon-components-react';



export default function BookAppointment() {
  const { userData } = useContext(UserContext);
  const [editorPatient, setEditorPatient] = useState("");
  const [editorDoctorNurse, setEditorDoctorNurse] = useState("");
  const [editorDate, setEditorDate] = useState("");
  const [editorTime, setEditorTime] = useState("");
  const [editorSymptoms, setEditorSymptoms] = useState("");
  const [editorNotes, setEditorNotes] = useState("");
  const [editorStatus, setEditorStatus] = useState("");

  async function saveAppointment(e){
    e.preventDefault();

    const appointmentData = {
      patient: userData.user.name,
      doctor_nurse: editorDoctorNurse,
      date: editorDate,
      time: editorTime,
      symptoms: editorSymptoms ? editorSymptoms : "Not provided",
      notes: editorNotes ? editorNotes : "Not provided",
      status: "Pending"
      //status: editorStatus
    }
    await Axios.post("http://localhost:5000/appointments/create", appointmentData);

    setEditorPatient("");
    setEditorDoctorNurse("");
    setEditorDate("");
    setEditorTime("");
    setEditorSymptoms("");
    setEditorNotes("");
    setEditorStatus("");

    window.location.replace("/appointmentconfirmation");
  }

// if the user is logged in display a book appointment form
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
        <br/><br/><br/><br/>
        <Tile><h2>Book an appointment</h2></Tile><br/>
        <div className="appointment-editer">
          <Form action="/appointmentconfirmation" onSubmit={saveAppointment}>
          <br/>
          <Select
              defaultValue=""
              id="editor-doctor_nurse"
              invalidText=""
              labelText="Medical Professional"
              helperText=""
              value={editorDoctorNurse}
              onChange={(e) => setEditorDoctorNurse(e.target.value)}
            >

              <SelectItem
                text="Select Doctor or Nurse"
                value=""
              />
            <SelectItemGroup label="Doctors">
              <SelectItem
                text="Dr. Meredith Grey"
                value="Dr. Meredith Grey"
              />
              <SelectItem
                text="Dr. Derek Shepherd"
                value="Dr. Derek Shepherd"
              />
              <SelectItem
                text="Dr. Alex Karev"
                value="Dr. Alex Karev"
              />
              <SelectItem
                text="Dr. George O'Malley"
                value="Dr. George O'Malley"
              />
              <SelectItem
                text="Dr. Miranda Bailey"
                value="Dr. Miranda Bailey"
              />
            </SelectItemGroup>

            <SelectItemGroup label="Nurses">
              <SelectItem
                text="Nurse April Kepner"
                value="Nurse April Kepner"
              />
              <SelectItem
                text="Nurse Andrew Deluca"
                value="Nurse Andrew Deluca"
              />
              <SelectItem
                text="Nurse Arizona Robbins"
                value="Nurse Arizona Robbins"
              />
              <SelectItem
                text="Nurse Jackson Avery"
                value="Nurse Jackson Avery"
              />
              <SelectItem
                text="Nurse Levi Schmitt"
                value="Nurse Levi Schmitt"
              />
            </SelectItemGroup>

          </Select>
          <br/>

          <TextInput
            id="editor-date"
            type="date"
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
            <Button type="submit">Book Appointment</Button>
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
