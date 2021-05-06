import React, { useContext, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import { Link } from "react-router-dom";
import { Button, Tile, ComposedModal, ModalHeader, ModalBody } from 'carbon-components-react';
import Axios from "axios";

import EditPrescriptionStatus from "../pages/EditPrescriptionStatus";

import QrScan from 'react-qr-reader';

import { Form } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { Select } from 'carbon-components-react';
import { SelectItem } from 'carbon-components-react';
import { TextArea } from 'carbon-components-react';
import { ModalFooter } from 'carbon-components-react';

export default function PharmacyScanner() {

  const { userData } = useContext(UserContext);
  const [prescription, setPrescription] = useState([]);
  const [editPrescriptionData, setEditPrescriptionData] = useState(null);
  const [open, setOpen] = useState(false);


  const [id, setId] = useState("");
  const [patient, setPatinet] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [medication, setMedication] = useState("");
  const [notes, setNotes] = useState("");
  const [complete, setComplete] = useState("");



  let returnedQrResult = "";
  let scanStatus = "";

  let qrId = "";
  let qrPatient = "";
  let qrDoctor = "";
  let qrDate = "";
  let qrTime = "";
  let qrMedication = "";
  let qrNotes = "";
  let qrComplete = "";

  const [qrscan, setQrscan] = useState(null);
   const handleScan = data => {
       if (data) {
           setQrscan(data)
       }
   }
   const handleError = err => {
   console.error(err)
   }

   async function editPresBtn() {
     editPrescription(prescription);
     setOpen(true);
   }

   async function renderForm(){
  var x = document.getElementById("editPrescriptionForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "block";
  }

   }

   function editPrescription(prescriptionData) {
     setEditPrescriptionData(prescriptionData);
     //console.log("prescription data");
     //console.log(prescriptionData);
   }

   if (qrscan != null) {
     returnedQrResult = qrscan;
     scanStatus = "PRESCRIPTION FOUND";

     console.log("found scanned qr code!");

     const scannedPrescription = Axios.get(`http://localhost:5000/prescriptions/${returnedQrResult}`)
          .then((response) => {
            //console.log("returned result");
            //console.log(response.data);
            setPrescription(response.data);

            qrId = response.data._id;
            qrPatient = response.data.patient;
            qrDoctor = response.data.doctor;
            qrDate = response.data.date;
            qrTime = response.data.time;
            qrMedication = response.data.medication;
            qrNotes = response.data.notes;
            qrComplete = response.data.complete;

            //console.log("the id is " + qrId);
            setId(qrId);
            //console.log("the patient is " + qrPatient);
            setPatinet(qrPatient);
            //console.log("the doctor is " + qrDoctor);
            setDoctor(qrDoctor);
            //console.log("the date is " + qrDate);
            setDate(qrDate);
            //console.log("the time is " + qrTime);
            setTime(qrTime);
            //console.log("the medication is " + qrMedication);
            setMedication(qrMedication);
            //console.log("the notes are " + qrNotes);
            setNotes(qrNotes);
            setComplete(qrComplete);
       });

     // setPrescription(prescriptionRes.data);

     renderForm();

   }

  return (
    <div className="page">
      {userData.user ? (
        <>
        <br/><br/><br/><br/>
        <Tile>
          <h2>Pharmacy Scanner</h2>
          <h5>SCAN PRESCRIPTIONS BELOW</h5>
        </Tile><br/>
        <div>
            <center>
            <div>
                <QrScan
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ height: 250, width: 250 }}
                />
            </div>
            </center>

            <div style={{marginTop:20}}>

            <Tile> <h1> {scanStatus} </h1></Tile>
            <div id="editPrescriptionForm" className="prescription-editer">
            <Form>
            <p>Prescription ID: {id}</p>
            <p>Patient: {patient}</p>
            <p>Doctor: {doctor}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Medication: {medication}</p>
            <p>Notes: {notes}</p>
            <p><strong>COLLECTED BY PATIENT: {complete}</strong></p>
            </Form>
            <Button kind='secondary' onClick={editPresBtn}>Edit Prescription Status</Button>

            <ComposedModal open={open} onClose={() => setOpen(false)}
            size="sm"
            >
            <ModalBody>
              <h3>Did the patient collect the medication on their prescription?</h3>
              <EditPrescriptionStatus
              setOpen={setOpen}
              editPrescription={editPrescription}
              editPrescriptionData={editPrescriptionData}
              />
            </ModalBody>
            </ComposedModal>
            </div>
            </div>
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
