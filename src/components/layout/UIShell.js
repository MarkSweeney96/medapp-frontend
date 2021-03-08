import React from "react";
//import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

//import { Button } from 'carbon-components-react';

import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import {
  //Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  //HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink
} from "carbon-components-react/lib/components/UIShell";

export default function UIShell() {
  return (
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
              MedApp
            </HeaderName>
            <HeaderGlobalBar>
                <AuthOptions />
            </HeaderGlobalBar>
            <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
              <SideNavItems>
                <SideNavLink href="/">
                  Dashboard
                </SideNavLink>
                <SideNavLink href="bookappointment">
                  Book an appointment
                </SideNavLink>
                <SideNavLink href="createprescription">
                  Create a prescription
                </SideNavLink>
                <SideNavLink href="viewappointments">
                  View my appointments
                </SideNavLink>
                <SideNavLink href="viewprescriptions">
                  View my presctiptions
                </SideNavLink>
                <SideNavLink href="/myaccount">
                  My account
                </SideNavLink>

              </SideNavItems>
            </SideNav>
          </Header>

        </>
      )}
    />
  </div>
  );
}
