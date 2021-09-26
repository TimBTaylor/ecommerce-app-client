import React from "react";
import { Navigation } from "../components/Navbar/Navigation";
import { ProductView } from "../components/Product-View/ProductView";

export const ProductViewPage = (props) => {
  const productId = props.location.product.product;
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <ProductView productId={productId} />
      </div>
    </>
  );
};
