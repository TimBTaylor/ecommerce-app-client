import React from "react";
import { Navigation } from "../components/Navbar/Navigation";
import { ProfileAddressView } from "../components/Profile-Address-View/ProfileAddressView";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const AddressView = () => {
  const allProducts = useSelector((state) => state.productReducer.data);
  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <div className="navigation-container">
            <Navigation />
          </div>
          <div className="component-container">
            <ProfileAddressView />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
