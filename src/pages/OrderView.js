import React from "react";
import { Orders } from "../components/Orders/Orders";
import { Navigation } from "../components/Navbar/Navigation";

export const OrderView = () => {
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <Orders />
      </div>
    </>
  );
};
