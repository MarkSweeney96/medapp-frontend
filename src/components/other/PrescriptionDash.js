import React, { useContext, useState, useEffect } from 'react';
import Axios from "axios";

import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { Button } from 'carbon-components-react';


export default function PrescriptionDash({ prescription, getPrescriptionsDash }) {

  const [open, setOpen] = useState(false);

  async function viewPrescriptionBtn() {
    setOpen(true);
  }

  return (
        <StructuredListRow tabIndex={0}>
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
            <strong>{prescription.complete}</strong>
          </StructuredListCell>
        </StructuredListRow>



  );
}
