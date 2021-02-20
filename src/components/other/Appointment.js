import React from 'react';


export default function Appointment({appointment}) {
  return (
    <div className="appointment">

        {<h4>Patient: {appointment.patient}</h4>}
        {<h4>Medical Professional: {appointment.doctor_nurse}</h4>}
        {<h4>Date: {appointment.date}</h4>}
        {<h4>Time: {appointment.time}</h4>}
        {appointment.symptoms && <h4>Symptoms: {appointment.symptoms}</h4>}
        {appointment.notes && <h4>Notes: {appointment.notes}</h4>}
        {<h4>Status: {appointment.status}</h4>}
        <br/>
    </div>
  );
}
