import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";

import Dashboard from "./components/pages/Dashboard";
import BookAppointment from "./components/pages/BookAppointment";
import EditAppointmentPatient from "./components/pages/EditAppointmentPatient";
import ViewAppointments from "./components/pages/ViewAppointments";
import ViewPrescriptions from "./components/pages/ViewPrescriptions";
import MyAccount from "./components/pages/MyAccount";
import AppointmentBooked from "./components/pages/AppointmentBooked";

import UIShell from "./components/layout/UIShell";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import "./index.scss";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

// this function runs when use logs in
  useEffect(() => {
    const checkLoggedIn = async () => {
      // checks if there is an auth token in localStorage
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      //gets info of currently logged in user
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/",{
          headers: { "x-auth-token": token },
      });
      setUserData({
        token,
        user: userRes.data,
      });
      }
    };

    checkLoggedIn();
  }, []);


//UserContext.Provider allows react access data for the currently logged in user
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <UIShell />
        <div className="container">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/bookappointment" component={BookAppointment} />
          <Route exact path="/appointmentconfirmation" component={AppointmentBooked} />
          <Route exact path="/viewappointments" component={ViewAppointments} />
          <Route exact path="/viewprescriptions" component={ViewPrescriptions} />
          <Route exact path="/myaccount" component={MyAccount} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
