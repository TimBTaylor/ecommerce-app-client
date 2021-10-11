import React from "react";
import { Navigation } from "../components/Navbar/Navigation";
import { ProfileView } from "../components/Profile-View/ProfileView";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const Profile = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <div className="navigation-container">
            <Navigation />
          </div>
          <div className="component-container">
            <ProfileView />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
