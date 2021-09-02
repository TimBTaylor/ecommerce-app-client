import React from "react";
import { Navigation } from "../Navbar/Navigation";
import { LandingPage } from "../Landing-Page/LandingPage";

import "./HomeView.css";

export const HomeView = () => {
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <LandingPage />
      </div>
    </>
  );
};
