import React from "react";
import { Navigation } from "../components/Navbar/Navigation";
import ProfileUpdate from "../components/Profile-Update/ProfileUpdate";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const PersonalInfoUpdate = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <div className="navigation-container">
            <Navigation />
          </div>
          <div className="component-container">
            <ProfileUpdate />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
