import React from "react";
import { Navigation } from "../components/Navbar/Navigation";
import { ProfileCard } from "../components/Profile-Credit-Card/ProfileCard";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const CreditCardView = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <div className="navigation-container">
            <Navigation />
          </div>
          <div className="component-container">
            <ProfileCard />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
