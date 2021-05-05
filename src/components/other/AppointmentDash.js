import React, { useState } from 'react';
//import Axios from "axios";

import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
//import { Button } from 'carbon-components-react';


export default function AppointmentDash({ appointment, getAppointmentsDash }) {

  const [open, setOpen] = useState(false);

  async function viewApptBtn() {
    setOpen(true);
  }

  return (
        <StructuredListRow tabIndex={0}>
          <StructuredListCell>
            {appointment.doctor_nurse}
          </StructuredListCell>
          <StructuredListCell>
            {appointment.date}
          </StructuredListCell>
          <StructuredListCell>
            {appointment.time}
          </StructuredListCell>
          <StructuredListCell>
            <strong>{appointment.status}</strong>
          </StructuredListCell>
        </StructuredListRow>



  );
}
