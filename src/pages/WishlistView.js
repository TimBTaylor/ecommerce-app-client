import React from "react";
import { Wishlist } from "../components/Wishlist/Wishlist";
import { Navigation } from "../components/Navbar/Navigation";

export const WishlistView = () => {
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <Wishlist />
      </div>
    </>
  );
};
