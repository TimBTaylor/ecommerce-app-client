import React from "react";
import { ProductReview } from "../components/Product-Review/ProductReview";
import { Navigation } from "../components/Navbar/Navigation";

export const ProductReviewPage = () => {
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <ProductReview />
      </div>
    </>
  );
};
