import React, { useContext, useState, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import { Form } from 'carbon-components-react';
//import Axios from "axios";


export default function ScannedPrescription({ qrPatient ={qrPatient} }) {

  console.log("passed over value for patient " + {qrPatient});

  return (
        <div>
          <Form>
          <p>Prescription ID: X</p>
          <p>Patient: {qrPatient}</p>
          <p>Doctor: X</p>
          <p>Date: X</p>
          <p>Time: X</p>
          <p>Medication: X</p>
          <p>Notes: X</p>
          <p>Complete: X</p>

          </Form>
        </div>
  );
}
