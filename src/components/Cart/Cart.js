import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

import "./Cart.css";

export const Cart = () => {
  const [shippingCost, setShippingCost] = useState(5);
  const allProducts = useSelector((state) => state.productReducer.data);

  const usersCart = useSelector((state) => state.userInfoReducer.cart);

  const productsToDisplay = [];

  let productsTotalPrice = 0;

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
        productsTotalPrice += product.price;
      }
      return currentProduct;
    });
    return productsToDisplay;
  });

  let salesTax = productsTotalPrice * 0.06 + productsTotalPrice;

  let estimatedTotal = salesTax + productsTotalPrice + shippingCost;

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
                <div key={product.id}>
                  <div className="cart-product">
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
                </div>
              );
            })}
          </div>
        </div>
        <div className="order-summary-content">
          <div className="order-summary-title-container">
            <h1 className="order-summary-title">order summary</h1>
          </div>
          <div className="order-summary-list-content-container">
            <div className="order-summary-list-title-container">
              <ul className="order-summary-list-title">
                <li className="order-summary-list-title-item">Subtotal</li>
                <li className="order-summary-list-title-item">Shipping</li>
                <li className="order-summary-list-title-item">Sales Tax</li>
                <li className="order-summary-list-title-item estimated-total">
                  Estimated Total
                </li>
              </ul>
            </div>
            <div className="order-summary-list-total-container">
              <ul className="order-summary-list-total">
                <li className="order-summary-list-total-item">
                  ${productsTotalPrice}
                </li>
                <li className="order-summary-list-total-item">
                  ${shippingCost}.00
                </li>
                <li className="order-summary-list-total-item">
                  ${salesTax.toFixed(2)}
                </li>
                <li className="order-summary-list-total-item estimated-total">
                  ${estimatedTotal.toFixed(2)}
                </li>
              </ul>
            </div>
          </div>
          <NavLink to="/review-order" style={{ all: "unset" }}>
            <div className="order-summary-checkout-container">
              <button className="order-summary-checkout">checkout</button>
            </div>
          </NavLink>
          <div className="order-summary-shipping">
            <h1 className="order-summary-shipping-title">
              Estimated Shipping Cost
            </h1>
            <div className="order-summary-shipping-form-container">
              <div className="form-check order-summary-form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="economyGround"
                  checked={shippingCost === 5}
                  onChange={() => setShippingCost(5)}
                />
                <label className="form-check-label" htmlFor="economyGround">
                  Economy Ground (3-7 Business Days): $5.00
                </label>
              </div>
              <div className="form-check order-summary-form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="standardGround"
                  checked={shippingCost === 8}
                  onChange={() => setShippingCost(8)}
                />
                <label className="form-check-label" htmlFor="standardGround">
                  Standard Ground (3-5 Business Days): $8.00
                </label>
              </div>
              <div className="form-check order-summary-form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="2buisnessdays"
                  checked={shippingCost === 13}
                  onChange={() => setShippingCost(13)}
                />
                <label className="form-check-label" htmlFor="2buisnessdays">
                  2 Business Days (Order By 1:30PM EST): $13.00
                </label>
              </div>
              <div className="form-check order-summary-form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="overnight"
                  checked={shippingCost === 25}
                  onChange={() => setShippingCost(25)}
                />
                <label className="form-check-label" htmlFor="overnight">
                  Overnight (Order By 1:30PM EST): $25.00
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
