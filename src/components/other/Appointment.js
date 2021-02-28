import React from 'react';
import Axios from "axios";

import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { ModalWrapper } from 'carbon-components-react';
import EditAppointment from "../pages/EditAppointment";


export default function Appointment({ appointment, getAppointments, editAppointment, editAppointmentData, showEditNotification, showDeleteNotification }) {

  async function deleteAppointment() {
    await Axios.delete(`http://localhost:5000/appointments/delete/${appointment._id}`);
      showDeleteNotification();
      getAppointments();
  }

  async function editApptBtn() {
    editAppointment(appointment);
    // var y = document.getElementById("editForm");
    // y.style.display = "block";
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


          <ModalWrapper
            buttonTriggerText="Edit/Delete"
            modalHeading="Edit or Delete Appointment"
            modalLabel="Press ESC to return to your appointments"
            passiveModal
            size="sm"
          >
          <Button kind='secondary' size='field' onClick={editApptBtn}>Edit</Button>
          <Button kind='danger' size='field' onClick={deleteAppointment}>Delete</Button>
          <EditAppointment
            editAppointmentData={editAppointmentData}
            getAppointments={getAppointments}
            showEditNotification={showEditNotification}
            />

    </ModalWrapper>


          </StructuredListCell>
        </StructuredListRow>
  );
}
