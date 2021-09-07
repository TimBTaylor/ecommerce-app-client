import React from "react";
import { Navigation } from "../components/Navbar/Navigation";
import { ProfileCard } from "../components/Profile-Credit-Card/ProfileCard";

export const CreditCardView = () => {
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <ProfileCard />
      </div>
    </>
  );
};
