import React from "react";
import { Navigation } from "../components/Navbar/Navigation";
import { ProductView } from "../components/Product-View/ProductView";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const ProductViewPage = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <div className="navigation-container">
            <Navigation />
          </div>
          <div className="component-container">
            <ProductView />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
