import React, { useContext } from "react";
import AuthOptions from "../auth/AuthOptions";
import UserContext from "../../context/UserContext";
import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import { HealthCross24, ReminderMedical16, Dashboard16, Stethoscope16, PillsAdd16, Pills16, UserAvatar16, QrCode16, ToolBox16 } from '@carbon/icons-react';

import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink
} from "carbon-components-react/lib/components/UIShell";



export default function UIShell() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <>

        <div className="container">
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="MedApp">
                <SkipToContent />
                <HeaderMenuButton
                  aria-label="Open menu"
                  onClick={onClickSideNavExpand}
                  isActive={isSideNavExpanded}
                />
                <HeaderName href="/" prefix="">
                  <HealthCross24 /> MedApp — Grey-Sloan Memorial Hospital
                </HeaderName>
                <HeaderGlobalBar>
                    <AuthOptions />
                </HeaderGlobalBar>
                <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                  <SideNavItems>
                  <SideNavLink href="/">
                    <img src="http://localhost:3000/img/hospital_logo.jpeg" alt="Grey Sloan Memorial Hospital" width="200" height="200"></img>
                  </SideNavLink>
                    <SideNavLink href="/">
                      <Dashboard16 /> Dashboard
                    </SideNavLink>
                    <SideNavLink href="bookappointment">
                      <ReminderMedical16 /> Book An Appointment
                    </SideNavLink>
                    <SideNavLink href="createprescription">
                      <PillsAdd16 /> Create A Prescription
                    </SideNavLink>
                    <SideNavLink href="viewappointments">
                      <Stethoscope16 /> View My Appointments
                    </SideNavLink>
                    <SideNavLink href="viewprescriptions">
                      <Pills16 /> View My Presctiptions
                    </SideNavLink>
                    <SideNavLink href="/myaccount">
                      <UserAvatar16 /> My Account
                    </SideNavLink>
                    <SideNavLink href="/pharmacyscanner">
                      <QrCode16 /> Pharmacy Scanner
                    </SideNavLink>
                    <SideNavLink href="/admin">
                      <ToolBox16 /> ADMIN TOOLS
                    </SideNavLink>

                  </SideNavItems>
                </SideNav>
              </Header>

            </>
          )}
        />
      </div>

        </>
      ) : (
        <>
        <div className="container">
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="MedApp">
                <HeaderName href="/" prefix="">
                  <HealthCross24 /> MedApp
                </HeaderName>
                <HeaderGlobalBar>
                    <AuthOptions />
                </HeaderGlobalBar>
              </Header>

            </>
          )}
        />
      </div>
        </>
      )}
    </div>
  );
}
