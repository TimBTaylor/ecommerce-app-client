import React from "react";
import { useSelector } from "react-redux";

import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

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
          currentProduct.title = product.title.substring(0, 60);
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
            {productsToDisplay.map((product) => {
              return (
                <div className="wishlist-product" key={product._id}>
                  <div className="wishlist-product-img-container">
                    <img
                      className="wishlist-product-img"
                      src={product.productImg}
                      alt="product"
                    />
                  </div>
                  <div className="wishlist-product-info">
                    <h1 className="wishlist-product-title">{product.title}</h1>
                    {/* <hr className="line-break wishlist-linebreak" /> */}
                    <h2 className="wishlist-product-size">
                      <span className="wishlist-product-size-title">
                        Size:{" "}
                      </span>
                      {product.size}
                    </h2>
                    {/* <hr className="line-break wishlist-linebreak" /> */}
                    <h2 className="wishlist-product-availability">
                      <span className="wishlist-product-availability-title">
                        Availability:{" "}
                      </span>
                      In Stock
                    </h2>
                    {/* <hr className="line-break wishlist-linebreak" /> */}
                    <h2 className="wishlist-product-price">${product.price}</h2>
                    {/* <hr className="line-break wishlist-linebreak" /> */}
                    <div className="wishlist-product-edit-and-remove">
                      <button className="wishlist-product-edit">
                        Edit Details
                      </button>
                      <span className="wishlist-button-seperation">|</span>
                      <button className="wishlist-product-remove">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="wishlist-quantity-add-container">
                    <div className="wishlist-quantity-container">
                      <button className="wishlist-quantity-minus">
                        <AiOutlineMinus />
                      </button>
                      <p className="current-quantity">{product.quantity}</p>
                      <button className="wishlist-quantity-plus">
                        <AiOutlinePlus />
                      </button>
                    </div>
                    <button className="wishlist-product-add">Add To Bag</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
