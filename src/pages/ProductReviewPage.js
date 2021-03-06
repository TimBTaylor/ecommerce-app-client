import React from "react";
import { ProductReview } from "../components/Product-Review/ProductReview";
import { Navigation } from "../components/Navbar/Navigation";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const ProductReviewPage = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <div className="navigation-container">
            <Navigation />
          </div>
          <div className="component-container">
            <ProductReview />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
