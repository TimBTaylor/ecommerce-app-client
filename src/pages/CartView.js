import React from "react";
import { Cart } from "../components/Cart/Cart";
import { Navigation } from "../components/Navbar/Navigation";

export const CartView = () => {
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <Cart />
      </div>
    </>
  );
};
