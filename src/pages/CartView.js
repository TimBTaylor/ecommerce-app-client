import React from "react";
import { Cart } from "../components/Cart/Cart";
import { Navigation } from "../components/Navbar/Navigation";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const CartView = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <div className="navigation-container">
            <Navigation />
          </div>
          <div className="component-container">
            <Cart />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
