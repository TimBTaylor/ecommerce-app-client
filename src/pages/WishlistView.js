import React from "react";
import { Wishlist } from "../components/Wishlist/Wishlist";
import { Navigation } from "../components/Navbar/Navigation";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const WishlistView = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <div className="navigation-container">
            <Navigation />
          </div>
          <div className="component-container">
            <Wishlist />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
