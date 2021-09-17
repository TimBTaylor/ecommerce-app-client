import React, { useState } from "react";
import { Link } from "react-router-dom";
import shoppingcart from "../Navbar/shopping-cart.svg";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./ReviewOrder.css";

export const ReviewOrder = () => {
  const [shippingCost, setShippingCost] = useState(5);

  const usersAddresses = useSelector((state) => state.userInfoReducer.address);

  const usersCards = useSelector((state) => state.userInfoReducer.cardInfo);

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
        currentProduct.id = product._id;
        currentProduct.quantity = product.quantity;
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

  let total = salesTax + productsTotalPrice + shippingCost;

  let fullCardNumber = usersCards[0].cardNumber;
  let shortenCardNumber = fullCardNumber.slice(fullCardNumber.length - 4);

  return (
    <div className="review-order-content-container">
      <div className="container">
        <nav className="navbar fixed-top navbar-expand-md navbar-light bg-light review-order-nav">
          <Link className="navbar-brand" to="/home">
            Timazon <img src={shoppingcart} alt="shopping cart" />{" "}
          </Link>
          <div className="navbar-items-container ml-auto">
            <ul className="navbar-nav-list">
              <li className="nav-list-item">
                <Link to="/profile" className="nav-item-link">
                  <CgProfile className="profile-icon" />
                </Link>
              </li>
              <li className="nav-list-item">
                <Link className="nav-item-link" to="/cart">
                  <IoCartOutline className="cart-icon" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="review-order-title-container">
          <h1 className="review-order-title">Review your order</h1>
        </div>
        <div className="review-order-content">
          <div className="shipping-payment-container">
            <div className="shipping-container">
              <div className="shipping-address-container">
                <div className="shipping-address-title-container">
                  <h1 className="shipping-address-title">shipping address</h1>
                  <button className="shipping-address-edit">Edit</button>
                </div>
                <h1 className="shipping-name">
                  {usersAddresses[0].fName} {usersAddresses[0].lName}
                </h1>
                <h1 className="shipping-address">
                  {usersAddresses[0].Address}
                </h1>
                <h1 className="shipping-city-state-zip">
                  {usersAddresses[0].City}, {usersAddresses[0].State}{" "}
                  {usersAddresses[0].ZIP}
                </h1>
                <h1 className="shipping-country">United States</h1>
              </div>
              <div className="shipping-method-container">
                <div className="shipping-method-title-container">
                  <h1 className="shipping-method-title">shipping method</h1>
                </div>
                <div className="order-review-form-container">
                  <div className="form-check order-review-form-check">
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
                  <div className="form-check order-review-form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="standardGround"
                      checked={shippingCost === 8}
                      onChange={() => setShippingCost(8)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="standardGround"
                    >
                      Standard Ground (3-5 Business Days): $8.00
                    </label>
                  </div>
                  <div className="form-check order-review-form-check">
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
                  <div className="form-check order-review-form-check">
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
            <div className="payment-container">
              <div className="payment-title-container">
                <h1 className="payment-title">payment method</h1>
                <button className="payment-edit">Edit</button>
              </div>
              <h1 className="payment-card">Credit Card</h1>
              <h1 className="payment-card-name">{usersCards[0].name}</h1>
              <h1 className="payment-card-number">
                ************{shortenCardNumber}
              </h1>
              <h1 className="payment-card-expires">{usersCards[0].expires}</h1>
            </div>
            <div className="review-order-products">
              <div className="review-order-products-title-container">
                <h1 className="review-order-products-title">Items</h1>
                <NavLink to="/cart">
                  <button className="review-order-products-edit">Edit</button>
                </NavLink>
              </div>
              {productsToDisplay.map((product) => {
                return (
                  <>
                    <div key={product._id}>
                      <div className="review-order-product-container">
                        <img
                          className="review-order-product-img"
                          src={product.productImg}
                          alt="product"
                        />
                        <div className="review-order-product-information">
                          <h1 className="review-order-product-title">
                            {product.title}
                          </h1>
                          <h2 className="review-order-product-size">
                            <span className="review-order-product-size-title">
                              Size:{" "}
                            </span>
                            {product.size}
                          </h2>
                          <h2 className="review-order-product-quantity">
                            <span className="review-order-product-quantity-title">
                              Quantity:{" "}
                            </span>
                            {product.quantity}
                          </h2>
                          <h2 className="review-order-product-availability">
                            <span className="review-order-product-availability-title">
                              Availability:{" "}
                            </span>{" "}
                            In Stock
                          </h2>
                          <h2 className="review-order-product-price">
                            ${product.price}
                          </h2>
                        </div>
                      </div>
                      <hr className="line-break" />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="review-order-summary">
            <div className="review-order-summary-title-container">
              <h1 className="review-order-summary-title">order summary</h1>
            </div>
            <div className="review-order-summary-list-content-container">
              <div className="review-order-summary-list-title-container">
                <ul className="review-order-summary-list-title">
                  <li className="review-order-summary-list-title-item">
                    Subtotal
                  </li>
                  <li className="review-order-summary-list-title-item">
                    Shipping
                  </li>
                  <li className="review-order-summary-list-title-item">
                    Sales Tax
                  </li>
                  <li className="review-order-summary-list-title-item estimated-total">
                    Order Total
                  </li>
                </ul>
              </div>
              <div className="review-order-summary-list-total-container">
                <ul className="review-order-summary-list-total">
                  <li className="review-order-summary-list-total-item">
                    ${productsTotalPrice}
                  </li>
                  <li className="review-order-summary-list-total-item">
                    ${shippingCost}.00
                  </li>
                  <li className="review-order-summary-list-total-item">
                    ${salesTax.toFixed(2)}
                  </li>
                  <li className="review-order-summary-list-total-item estimated-total">
                    ${total.toFixed(2)}
                  </li>
                </ul>
              </div>
            </div>
            <NavLink to="/review-order" style={{ all: "unset" }}>
              <div className="review-order-summary-checkout-container">
                <button className="review-order-summary-checkout">
                  submit order
                </button>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
