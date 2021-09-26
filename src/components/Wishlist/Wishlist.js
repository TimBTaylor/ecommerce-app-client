import React from "react";
import { useSelector } from "react-redux";
import { WishlistProductCard } from "./WishlistProductCard";

import "./Wishlist.css";

export const Wishlist = () => {
  const allProduct = useSelector((state) => state.productReducer.data);

  const usersWishlist = useSelector((state) => state.userInfoReducer.wishlist);

  const productsToDisplay = [];

  usersWishlist.map((entry) => {
    allProduct.map((product) => {
      const currentProduct = {};
      if (entry.productId === product._id) {
        currentProduct.productImg = product.image;
        currentProduct.size = entry.size;
        currentProduct.quantity = entry.quantity;
        currentProduct.id = product._id;
        currentProduct.price = product.price;

        if (product.title.length > 60) {
          currentProduct.title = product.title.substring(0, 60) + "...";
        } else {
          currentProduct.title = product.title;
        }
        productsToDisplay.push(currentProduct);
      }
      return currentProduct;
    });
    return productsToDisplay;
  });

  return (
    <>
      <div className="wishlist-content-container">
        <div className="container">
          <div className="wishlist-title-container">
            <h1 className="wishlist-title">wishlist</h1>
            <hr className="line-break" />
          </div>
          <div className="wishlist-content">
            {productsToDisplay.length > 0 ? (
              productsToDisplay.map((product) => {
                return (
                  <>
                    <WishlistProductCard key={product.id} product={product} />
                  </>
                );
              })
            ) : (
              <div className="no-items">No items in your wishlist</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
