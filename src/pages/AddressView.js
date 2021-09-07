import React from "react";
import { Navigation } from "../components/Navbar/Navigation";
import { ProfileAddressView } from "../components/Profile-Address-View/ProfileAddressView";

export const AddressView = () => {
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <ProfileAddressView />
      </div>
    </>
  );
};
