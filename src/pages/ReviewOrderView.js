import React from "react";
import { ReviewOrder } from "../components/ReviewOrder/ReviewOrder";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const ReviewOrderView = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  return (
    <>
      {allProducts.length > 0 ? (
        <div className="review-order-page-container">
          <ReviewOrder />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
