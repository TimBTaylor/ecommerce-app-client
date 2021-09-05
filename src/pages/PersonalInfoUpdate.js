import React from "react";
import { Navigation } from "../components/Navbar/Navigation";
import { ProfileUpdate } from "../components/Profile-Update/ProfileUpdate";

export const PersonalInfoUpdate = () => {
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <ProfileUpdate />
      </div>
    </>
  );
};
