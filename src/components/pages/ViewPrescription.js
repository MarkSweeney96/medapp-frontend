import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import Axios from "axios";
import QRCode from "qrcode.react";

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



export default function ViewPrescription({ getPrescriptions, editPrescriptionData, setOpenView }) {
  const { userData } = useContext(UserContext);
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
    getPrescriptions();

  }



// if the user is logged in display a book appointment form
// if not, alert them they are not logged in and provied a login link
  return (
    <div className="page">
      {userData.user ? (
        <>
        <div id="editForm" className="prescription-editer">
          <Form>
          <p>Prescription ID: {editorId}</p>
          <p>Patient: {editorPatient}</p>
          <p>Doctor: {editorDoctor}</p>
          <p>Date: {editorDate}</p>
          <p>Time: {editorTime}</p>
          <p>Medication: {editorMedication}</p>
          <p>Notes: {editorNotes}</p>
          <p>Complete: {editorComplete}</p>
          <QRCode value={editorId} />
          <br/>
          <p><strong>PLEASE PRESENT THIS PRESCRIPTION TO YOUR PHARMACIST</strong></p>
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
