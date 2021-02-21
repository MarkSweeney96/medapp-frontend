import React from 'react';
import Axios from "axios";

import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { Button } from 'carbon-components-react';


export default function Appointment({ appointment, getAppointments, editAppointment }) {

  async function deleteAppointment() {
    await Axios.delete(`http://localhost:5000/appointments/delete/${appointment._id}`);
      getAppointments();
  }

  return (
        <StructuredListRow tabIndex={0}>
          <StructuredListCell>
            {appointment.patient}
          </StructuredListCell>
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
            {appointment.symptoms && appointment.symptoms}
          </StructuredListCell>
          <StructuredListCell>
            {appointment.notes && appointment.notes}
          </StructuredListCell>
          <StructuredListCell>
            {appointment.status}
          </StructuredListCell>
          <StructuredListCell>
            <Button kind='secondary' size='field' onClick={() => editAppointment(appointment)}>Edit</Button>
            <Button kind='danger' size='field' onClick={deleteAppointment}>Delete</Button>
          </StructuredListCell>
        </StructuredListRow>
  );
}
