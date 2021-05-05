import React, { useContext, useState, useEffect } from 'react';
import Axios from "axios";

import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Modal, ModalHeader, ComposedModal, ModalTitle, ModalBody, ModalFooter } from 'carbon-components-react';
import { QrCode16 } from '@carbon/icons-react';

//import EditPrescriptionPhar from "../pages/EditPrescriptionPhar";
import ViewPrescription from "../pages/ViewPrescription";

export default function Prescription({ prescription, getPrescriptions, editPrescription, editPrescriptionData, showEditNotification, showDeleteNotification }) {

const [open, setOpen] = useState(false);
const [openView, setOpenView] = useState(false);
const [open_del, setOpenDel] = useState(false);

  async function deletePrescription() {
    await Axios.delete(`http://localhost:5000/prescriptions/delete/${prescription._id}`);
      showDeleteNotification();
      getPrescriptions();
      setOpenDel(false);
  }

  async function editPresBtn() {
    //editPrescription(prescription);
    setOpen(true);
  }

  async function viewPresBtn() {
    editPrescription(prescription);
    setOpenView(true);
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

          <Button kind='primary' onClick={viewPresBtn}><QrCode16 /></Button>

          <ComposedModal open={openView} onClose={() => setOpenView(false)}
          size="sm"
          >
          <ModalHeader label="">
            <h2>
              View Prescription
            </h2>
          </ModalHeader>
          <ModalBody>
            <ViewPrescription
              editPrescriptionData={editPrescriptionData}
              getPrescriptions={getPrescriptions}
              setOpenView={setOpenView}
              />
          </ModalBody>
          </ComposedModal>
          </StructuredListCell>
        </StructuredListRow>
  );
}
