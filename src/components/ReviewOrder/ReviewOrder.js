import React, { useState } from "react";
import { Link } from "react-router-dom";
import shoppingcart from "../Navbar/shopping-cart.svg";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsCheckCircle } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addOrder } from "../../actions/addOrder";
import { removeAllFromCart } from "../../actions/removeAllFromCart";

import "./ReviewOrder.css";

export const ReviewOrder = () => {
  const dispatch = useDispatch();

  const [shippingCost, setShippingCost] = useState(5);

  const [addressIndex, setAddressIndex] = useState(0);

  const [cardIndex, setCardIndex] = useState(0);

  const usersAddresses = useSelector((state) => state.userInfoReducer.address);

  const usersCards = useSelector((state) => state.userInfoReducer.cardInfo);

  const allProducts = useSelector((state) => state.productReducer.data);
  const usersCart = useSelector((state) => state.userInfoReducer.cart);

  let userId = localStorage.getItem("userId");

  const productsToDisplay = [];

  let productsTotalPrice = 0;

  let name = usersAddresses[addressIndex].name;

  let itemsQuantity = 0;

  let orderNumber = Math.floor(Math.random() * 999999999999);

  let newDate = new Date();

  let curr_date = newDate.getDate();
  let curr_month = newDate.getMonth();
  let curr_year = newDate.getFullYear();
  let date = curr_month + "/" + curr_date + "/" + curr_year;

  usersCart.map((entry) => {
    allProducts.map((product) => {
      const currentProduct = {};
      if (entry.productId === product._id) {
        currentProduct.productImg = product.image;
        currentProduct.size = entry.size;
        currentProduct.id = product._id;
        currentProduct.quantity = product.quantity;
        currentProduct.price = product.price;

        if (product.quantity > 1) {
          itemsQuantity += product.quantity;
        } else {
          itemsQuantity += 1;
        }

        if (product.title.length > 60) {
          currentProduct.title = product.title.substring(0, 60) + "...";
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

  let salesTax = productsTotalPrice * 0.06;

  let total = salesTax + productsTotalPrice + shippingCost;

  let fullCardNumber = usersCards[cardIndex].cardNumber;
  let shortenCardNumber = fullCardNumber.slice(fullCardNumber.length - 4);

  let orderInformation = {
    products: productsToDisplay,
    total: JSON.parse(total.toFixed(2)),
    quantity: itemsQuantity,
    orderNumber,
    shippingType: shippingCost,
    date,
    name,
  };

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
                  <button
                    className="shipping-address-edit"
                    data-toggle="modal"
                    data-target="#usersAddressModal"
                  >
                    Edit
                  </button>
                </div>
                <h1 className="shipping-name">
                  {usersAddresses[addressIndex].name}
                </h1>
                <h1 className="shipping-address">
                  {usersAddresses[addressIndex].streetAddress}
                </h1>
                <h1 className="shipping-city-state-zip">
                  {usersAddresses[addressIndex].city},{" "}
                  {usersAddresses[addressIndex].state}{" "}
                  {usersAddresses[addressIndex].zipcode}
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
                <button
                  className="payment-edit"
                  data-toggle="modal"
                  data-target="#usersCardModal"
                >
                  Edit
                </button>
              </div>
              <h1 className="payment-card">Credit Card</h1>
              <h1 className="payment-card-name">
                {usersCards[cardIndex].name}
              </h1>
              <h1 className="payment-card-number">
                ************{shortenCardNumber}
              </h1>
              <h1 className="payment-card-expires">
                {usersCards[cardIndex].expires}
              </h1>
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
                    <div key={product.productId}>
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
            <NavLink
              onClick={() => {
                dispatch(addOrder(userId, orderInformation));
                dispatch(removeAllFromCart(userId));
              }}
              to="/orders"
              style={{ all: "unset" }}
            >
              <div className="review-order-summary-checkout-container">
                <button className="review-order-summary-checkout">
                  submit order
                </button>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="modal" id="usersAddressModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-title users-address-modal-title-container">
              <h1 className="users-address-modal-title">
                Choose shipping address
              </h1>
              <div className="users-address-modal-title-buttons">
                <button
                  className="users-address-modal-title-button-close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button>
                <button
                  className="users-address-modal-title-button-x"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="users-address-modal-x" aria-hidden="true">
                    &times;
                  </span>
                </button>
              </div>
            </div>
            <div className="modal-body users-address-modal-body">
              <div className="address-modal-content">
                {usersAddresses.map((address) => {
                  return (
                    <div
                      key={usersAddresses.indexOf(address)}
                      className="users-address"
                      onClick={() =>
                        setAddressIndex(usersAddresses.indexOf(address))
                      }
                    >
                      <p className="users-address-modal-name">
                        {address.fName} {address.lName}
                      </p>
                      <p className="users-address-modal-address">
                        {address.Address}
                      </p>
                      <p className="users-address-modal-city-state-zip">
                        {address.City}, {address.State} {address.ZIP}
                      </p>
                      <p className="users-address-modal-country">
                        United States
                      </p>
                      {usersAddresses.indexOf(address) === addressIndex ? (
                        <button className="users-address-modal-current-address">
                          <BsCheckCircle className="users-address-modal-check" />{" "}
                          Deliver to this address
                        </button>
                      ) : (
                        <button className="users-address-modal-new-address">
                          Deliver to this address
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="users-address-modal-sidebar">
                <NavLink
                  className="users-address-modal-side-navlink"
                  to="/profile-address"
                >
                  <MdKeyboardArrowRight className="users-address-modal-arrow-right" />
                  Add a new shipping address
                </NavLink>
                <NavLink to="/profile-address">
                  <MdKeyboardArrowRight className="users-address-modal-arrow-right" />
                  Edit or delete addresses
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" id="usersCardModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-title users-card-modal-title-container">
              <h1 className="users-card-modal-title">Choose a card</h1>
              <div className="users-card-modal-title-buttons">
                <button
                  className="users-card-modal-title-button-close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button>
                <button
                  className="users-card-modal-title-button-x"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="users-card-modal-x" aria-hidden="true">
                    &times;
                  </span>
                </button>
              </div>
            </div>
            <div className="modal-body users-card-modal-body">
              <div className="card-modal-content">
                {usersCards.map((card) => {
                  let fullCardNumber =
                    usersCards[usersCards.indexOf(card)].cardNumber;
                  let shortenCardNumber = fullCardNumber.slice(
                    fullCardNumber.length - 4
                  );
                  return (
                    <div
                      key={usersCards.indexOf(card)}
                      className="users-card"
                      onClick={() => setCardIndex(usersCards.indexOf(card))}
                    >
                      <p className="users-card-modal-name">{card.name}</p>
                      <p className="users-card-modal-number">
                        ************{shortenCardNumber}
                      </p>
                      <p className="users-card-modal-expires">{card.expires}</p>
                      {usersCards.indexOf(card) === cardIndex ? (
                        <button className="users-card-modal-current-card">
                          <BsCheckCircle className="users-card-modal-check" />{" "}
                          Use this card
                        </button>
                      ) : (
                        <button className="users-card-modal-new-card">
                          Use this card
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="users-card-modal-sidebar">
                <NavLink
                  className="users-card-modal-side-navlink"
                  to="/profile-card"
                >
                  <MdKeyboardArrowRight className="users-card-modal-arrow-right" />
                  Add a new card
                </NavLink>
                <NavLink to="/profile-card">
                  <MdKeyboardArrowRight className="users-card-modal-arrow-right" />
                  Edit or delete cards
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
