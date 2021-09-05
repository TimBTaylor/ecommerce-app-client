import React from "react";
import { Navigation } from "../components/Navbar/Navigation";
import { ProfileView } from "../components/Profile-View/ProfileView";

export const Profile = () => {
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <ProfileView />
      </div>
    </>
  );
};
