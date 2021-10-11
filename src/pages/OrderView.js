import React from "react";
import { Orders } from "../components/Orders/Orders";
import { Navigation } from "../components/Navbar/Navigation";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const OrderView = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <div className="navigation-container">
            <Navigation />
          </div>
          <div className="component-container">
            <Orders />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
