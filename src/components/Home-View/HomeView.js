import React from "react";
import { Navigation } from "../Navbar/Navigation";
import { LandingPage } from "../Landing-Page/LandingPage";
import { useSelector } from "react-redux";
import { LoadingAnimation } from "../Loading-Animation/LoadingAnimation";

import "./HomeView.css";

export const HomeView = () => {
  const isLoading = useSelector((state) => state.productReducer.loading);
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        {isLoading ? <LoadingAnimation /> : <LandingPage />}
      </div>
    </>
  );
};
