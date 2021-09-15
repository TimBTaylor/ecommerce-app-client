import React from "react";
import { useSelector } from "react-redux";

import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

import "./Cart.css";

export const Cart = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  const usersCart = useSelector((state) => state.userInfoReducer.cart);

  const productsToDisplay = [];

  usersCart.map((entry) => {
    allProducts.map((product) => {
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
      <div className="cart-content-container">
        <div className="container">
          <div className="cart-title-container">
            <h1 className="cart-title">cart</h1>
            <hr className="line-break" />
          </div>
          <div className="cart-content">
            {productsToDisplay.map((product) => {
              return (
                <>
                  <div className="cart-product" key={product._id}>
                    <img
                      className="cart-product-img"
                      src={product.productImg}
                      alt="product"
                    />
                    <div className="cart-product-info">
                      <h1 className="cart-product-title">{product.title}</h1>
                      <h2 className="cart-product-size">
                        <span className="cart-product-size-title">Size: </span>{" "}
                        {product.size}
                      </h2>
                      <h2 className="cart-product-availability">
                        <span className="cart-product-availability">
                          Availability:{" "}
                        </span>{" "}
                        In Stock
                      </h2>
                      <h2 className="cart-product-price">${product.price}</h2>
                      <div className="cart-buttons-container">
                        <div className="cart-product-edit-and-remove">
                          <button className="cart-product-edit">
                            Edit Details
                          </button>
                          <span className="cart-buttons-seperation">|</span>
                          <button className="cart-product-remove">
                            Remove
                          </button>
                        </div>
                        <div className="cart-quantity-add-container">
                          <div className="cart-quantity-container">
                            <button className="cart-quantity-minus">
                              <AiOutlineMinus />
                            </button>
                            <p className="cart-current-quantity">
                              {product.quantity}
                            </p>
                            <button className="cart-quantity-minus">
                              <AiOutlinePlus />{" "}
                            </button>
                          </div>
                          <button className="cart-product-add">
                            Add To Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="order-summary-content">
          <div className="order-summary-title-container">
            <h1 className="order-summary-title">order summary</h1>
          </div>
          <div className="order-summary-list-title-container">
            <ul className="order-summary-list-title">
              <li className="order-summary-list-title-item">Subtotal</li>
              <li className="order-summary-list-title-item">Shipping</li>
              <li className="order-summary-list-title-item">Sales Tax</li>
              <li className="order-summary-list-title-item">Estimated Total</li>
            </ul>
          </div>
          <div className="order-summary-list-total-container">
            <ul className="order-summary-list-total">
              <li className="order-summary-list-total-item">subtotal here</li>
              <li className="order-summary-list-total-item">shippin here</li>
              <li className="order-summary-list-total-item">tax here</li>
              <li className="order-summary-list-total-item">total here</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
