import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import Axios from "axios";
import ErrorMsg from "../other/ErrorMsg";

import { Tile } from 'carbon-components-react';
import { Form } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Select } from 'carbon-components-react';
import { SelectItem, SelectItemGroup } from 'carbon-components-react';
import { TextArea } from 'carbon-components-react';
import { InlineNotification } from 'carbon-components-react';
import { NotificationActionButton } from 'carbon-components-react';



export default function CreatePrescription() {
  const { userData } = useContext(UserContext);
  const [editorPatient, setEditorPatient] = useState("");
  const [editorDoctor, setEditorDoctor] = useState("");
  const [editorDate, setEditorDate] = useState("");
  const [editorTime, setEditorTime] = useState("");
  const [editorMedication, setEditorMedication] = useState("");
  const [editorNotes, setEditorNotes] = useState("");
  const [editorComplete, setEditorComplete] = useState("");
  const [error, setError] = useState();
  let todaysDate = new Date();
  let currentTime = new Date();
  let todaysDateFormatted = "";


  async function getDateTime(){
    var dd = String(todaysDate.getDate()).padStart(2, '0');
    var mm = String(todaysDate.getMonth() + 1).padStart(2, '0');
    var yyyy = todaysDate.getFullYear();
    var hr = (currentTime.getHours()<10?'0':'') + currentTime.getHours();
    var min = (currentTime.getMinutes()<10?'0':'') + currentTime.getMinutes();

    todaysDate = yyyy + '-' + mm + '-' + dd;
    todaysDateFormatted = dd + '/' + mm + '/' + yyyy;
    currentTime = hr + ":" + min
    console.log("todays date is " + todaysDate);
    console.log("current time is " + currentTime);

  }
  getDateTime();


  async function savePrescription(e){
    e.preventDefault();

    try {
      const appointmentData = {
        patient: editorPatient,
        doctor: userData.user.name,
        date: todaysDate,
        time: currentTime,
        medication: editorMedication,
        notes: editorNotes,
        complete: "No"
      }
      await Axios.post("http://localhost:5000/prescriptions/create", appointmentData);

      setEditorPatient("");
      setEditorDoctor("");
      setEditorDate("");
      setEditorTime("");
      setEditorMedication("");
      setEditorNotes("");
      setEditorComplete("");

      window.location.replace("/prescriptionconfirmation");
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
        <br/><br/><br/><br/>
        <Tile><h2>Create a prescription</h2></Tile><br/>
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
        <div className="prescription-editer">
          <Form action="/appointmentconfirmation" onSubmit={savePrescription}>
          <br/>
          <Select
              defaultValue=""
              id="editor-patient"
              invalidText=""
              labelText="Patient"
              helperText=""
              value={editorPatient}
              onChange={(e) => setEditorPatient(e.target.value)}
            >
              <SelectItem
                text="Select Patient"
                value=""
              />
              <SelectItem
                text="Amber O'Brien"
                value="Amber O'Brien"
              />
              <SelectItem
                text="Pat Gallagher"
                value="Pat Gallagher"
              />
              <SelectItem
                text="Tim Smyth"
                value="Tim Smyth"
              />
              <SelectItem
                text="Olivia Brady"
                value="Olivia Brady"
              />
              <SelectItem
                text="Chad West"
                value="Chad West"
              />
              <SelectItem
                text="Olivia Pope"
                value="Olivia Pope"
              />
              <SelectItem
                text="Quinn Perkins"
                value="Quinn Perkins"
              />
              <SelectItem
                text="Mellie Grant"
                value="Mellie Grant"
              />
              <SelectItem
                text="Fitzgerald Grant"
                value="Fitzgerald Grant"
              />
              <SelectItem
                text="Cyrus Beene"
                value="Cyrus Beene"
              />
              <SelectItem
                text="Jake Ballard"
                value="Jake Ballard"
              />
              <SelectItem
                text="David Rosen"
                value="David Rosen"
              />
              <SelectItem
                text="Abby Whelan"
                value="Abby Whelan"
              />
              <SelectItem
                text="Annalise Keating"
                value="Annalise Keating"
              />
              <SelectItem
                text="Wes Gibbins"
                value="Wes Gibbins"
              />
              <SelectItem
                text="Connor Walsh"
                value="Connor Walsh"
              />
              <SelectItem
                text="Oliver Hampton"
                value="Oliver Hampton"
              />
              <SelectItem
                text="Michelle Visage"
                value="Michelle Visage"
              />
          </Select>
          <br/>
          <p>Date: {todaysDateFormatted} (today)</p>
          <br/>
          <p>Time: {currentTime} (current time)</p>
          <br/>



          <TextInput
            id="editor-medication"
            type="text"
            placeholder="Medication name goes here..."
            labelText="Medication"
            helperText="Enter the medication you are prescribing to your patient"
            value={editorMedication}
            onChange={(e) => setEditorMedication(e.target.value)}
          />
          <br/>

          <TextArea
            id="editor-notes"
            type="text"
            placeholder="Enter notes here..."
            labelText="Notes"
            helperText="Enter the dosage with instructions or notes for the medication"
            value={editorNotes}
            onChange={(e) => setEditorNotes(e.target.value)}
          />

          <br/>
            <Button type="submit">Prescribe Medication</Button>
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
