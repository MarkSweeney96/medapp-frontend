import React, { useContext, useState, useEffect } from 'react';
import Axios from "axios";

import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { Modal, ModalHeader, ComposedModal, ModalTitle, ModalBody, ModalFooter } from 'carbon-components-react';

import EditPrescriptionPhar from "../pages/EditPrescriptionPhar";
import ViewPrescription from "../pages/ViewPrescription";

export default function PrescriptionNew({ qrId, prescription, getPrescriptions, editPrescription, editPrescriptionData, showEditNotification, showDeleteNotification }) {

const [open, setOpen] = useState(false);



  async function editPresBtn() {
    editPrescription(prescription);
  }

  return (
        <StructuredListRow tabIndex={0}>
          <StructuredListCell>

          {editPresBtn()}
          
            <EditPrescriptionPhar
              qrId={qrId}
              editPrescriptionData={editPrescriptionData}
              getPrescriptions={getPrescriptions}
              showEditNotification={showEditNotification}
              setOpen={setOpen}
              />

          </StructuredListCell>
        </StructuredListRow>
  );
}
