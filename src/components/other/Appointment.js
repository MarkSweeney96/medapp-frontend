import React, { useState } from 'react';
import Axios from "axios";

import { StructuredListRow } from 'carbon-components-react';
import { StructuredListCell } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { ModalHeader, ComposedModal, ModalBody, ModalFooter } from 'carbon-components-react';

import EditAppointmentPatient from "../pages/EditAppointmentPatient";
import EditAppointmentSec from "../pages/EditAppointmentSec";
import EditAppointmentDocNurse from "../pages/EditAppointmentDocNurse";

export default function Appointment({ appointment, getAppointments, editAppointment, editAppointmentData, showEditNotification, showDeleteNotification }) {

const [open, setOpen] = useState(false);
const [open_del, setOpenDel] = useState(false);

  async function deleteAppointment() {
    await Axios.delete(`http://localhost:5000/appointments/delete/${appointment._id}`);
      showDeleteNotification();
      getAppointments();
      setOpenDel(false);
  }

  async function editApptBtn() {
    editAppointment(appointment);
    setOpen(true);
  }

  async function deleteApptBtn() {
    setOpenDel(true);
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
            <strong>{appointment.status}</strong>
          </StructuredListCell>
          <StructuredListCell>

          <Button kind='primary' onClick={editApptBtn}>Edit</Button>


          <ComposedModal open={open} onClose={() => setOpen(false)}
          size="sm"
          >
          <ModalHeader label="">
            <h2>
              Edit Appointment
            </h2>
          </ModalHeader>
          <ModalBody>
            <EditAppointmentSec
              editAppointmentData={editAppointmentData}
              getAppointments={getAppointments}
              showEditNotification={showEditNotification}
              setOpen={setOpen}
              />
          </ModalBody>

          </ComposedModal>

          </StructuredListCell>

          <StructuredListCell>
            <Button kind='danger' onClick={deleteApptBtn}>Delete</Button>

          <ComposedModal
            open={open_del}
            onClose={() => setOpenDel(false)}
            size="sm"
          >
           <ModalHeader label="" title="Are you sure you want to delete this appointment?" />
           <ModalFooter>
            <Button
              kind="secondary"
              onClick={() => setOpenDel(false)}
            >
              Close
            </Button>
            <Button
              kind="danger"
              onClick={deleteAppointment}
              >
              Delete Appointment
            </Button>
          </ModalFooter>
          </ComposedModal>

          </StructuredListCell>
        </StructuredListRow>
  );
}
