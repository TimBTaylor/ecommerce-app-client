import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { CartProductCard } from "./CartProductCard";

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
        if (entry.quantity > 1) {
          productsTotalPrice += product.price * entry.quantity;
        } else {
          productsTotalPrice += product.price;
        }
      }
      return currentProduct;
    });
    return productsToDisplay;
  });

  let salesTax = productsTotalPrice * 0.06;

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
            {productsToDisplay.length > 0 ? (
              productsToDisplay.map((product) => {
                return <CartProductCard product={product} key={product.id} />;
              })
            ) : (
              <div className="no-items">No items in your cart</div>
            )}
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
                  ${productsTotalPrice.toFixed(2)}
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
