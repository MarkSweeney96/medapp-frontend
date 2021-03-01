import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import Axios from "axios";

//import { Tile } from 'carbon-components-react';
import { Form } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Select } from 'carbon-components-react';
import { SelectItem, SelectItemGroup } from 'carbon-components-react';
import { TextArea } from 'carbon-components-react';
import { ModalFooter } from 'carbon-components-react';
import { DatePicker } from 'carbon-components-react';
import { DatePickerInput } from 'carbon-components-react';



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
          <span><strong>SECRETARY VERSION OF THE EDIT FORM</strong></span>
        <div id="editForm" className="appointment-editer">
          <Form onSubmit={saveAppointment}>
          <br/>Patient: {editorPatient}<br/><br/>
          <br/>

          <Select
              defaultValue=""
              id="editor-doctor_nurse"
              invalidText=""
              labelText="Medical Professional"
              helperText="Pick a doctor or nurse"
              value={editorDoctorNurse}
              onChange={(e) => setEditorDoctorNurse(e.target.value)}
            >
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
          Symptoms: {editorSymptoms}<br/>
          <br/>
            Notes: {editorNotes}<br/>
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
                value="Pending"
              />
              <SelectItem
                text="Confirmed"
                value="Confirmed"
              />
              <SelectItem
                text="Cancelled"
                value="Cancelled"
              />
          </Select>
          <br/><br/>

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
