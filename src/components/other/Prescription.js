import React, { useContext, useState, useEffect } from 'react';
import Axios from "axios";

import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Modal, ModalHeader, ComposedModal, ModalTitle, ModalBody, ModalFooter } from 'carbon-components-react';

//import EditPrescription from "../pages/EditPrescription";

export default function Prescription({ prescription, getPrescriptions, editPrescription, editPrescriptionData, showEditNotification, showDeleteNotification }) {

const [open, setOpen] = useState(false);
const [open_del, setOpenDel] = useState(false);

  async function deletePrescription() {
    await Axios.delete(`http://localhost:5000/prescriptions/delete/${prescription._id}`);
      showDeleteNotification();
      getPrescriptions();
      setOpenDel(false);
  }

  async function viewPrescriptionBtn() {
    setOpen(true);
  }

  async function deletePrescriptionBtn() {
    setOpenDel(true);
  }


  return (
        <StructuredListRow tabIndex={0}>
          <StructuredListCell>
            {prescription.patient}
          </StructuredListCell>
          <StructuredListCell>
            {prescription.doctor}
          </StructuredListCell>
          <StructuredListCell>
            {prescription.date}
          </StructuredListCell>
          <StructuredListCell>
            {prescription.time}
          </StructuredListCell>
          <StructuredListCell>
            {prescription.medication}
          </StructuredListCell>
          <StructuredListCell>
            {prescription.notes}
          </StructuredListCell>
          <StructuredListCell>
            <strong>{prescription.complete}</strong>
          </StructuredListCell>
          <StructuredListCell>

          <Button kind='primary' onClick={viewPrescriptionBtn}>View</Button>


          <ComposedModal open={open} onClose={() => setOpen(false)}
          size="sm"
          >
          <ModalHeader label="">
            <h2>
              Prescription
            </h2>
          </ModalHeader>
          <ModalBody>
          prescription data
          </ModalBody>

          </ComposedModal>

          </StructuredListCell>

          <StructuredListCell>

            <Button kind='danger' onClick={deletePrescriptionBtn}>Delete</Button>

          <ComposedModal
            open={open_del}
            onClose={() => setOpenDel(false)}
            size="sm"
          >
           <ModalHeader label="" title="Are you sure you want to delete this prescription?" />
           <ModalFooter>
            <Button
              kind="secondary"
              onClick={() => setOpenDel(false)}
            >
              Close
            </Button>
            <Button
              kind="danger"
              onClick={deletePrescription}
              >
              Delete Prescription
            </Button>
          </ModalFooter>
          </ComposedModal>

          </StructuredListCell>
        </StructuredListRow>
  );
}
