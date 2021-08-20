import React, { useState } from "react";
import shoppingcart from "./shopping-cart.svg";
import pin from "./pin.svg";
import searchIcon from "./search.svg";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";

export const Navigation = () => {
  const name = localStorage.getItem("firstName");
  const productsList = useSelector((state) => state.productReducer.data);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const submitSearchInput = (input) => {
    const filteredProductsList = productsList.filter((product) => {
      return product.title.toLowerCase().includes(input.toLowerCase());
    });
    dispatch({
      type: "PRODUCTS_FILTERED",
      payload: filteredProductsList,
    });
  };
  return (
    <>
      <div className="free-shipping-container fixed-top">
        <p className="free-shipping">FREE SHIPPING FOR ALL U.S ORDERS</p>
      </div>
      <nav className="navbar fixed-top navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="#home">
          Timazon <img src={shoppingcart} alt="shopping cart" />{" "}
        </a>
        <a className="navbar-brand deliver-to" href="#home">
          <img alt="map-marker" src={pin} />
          Deliver to {name}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="mx-2 mx-auto d-inline">
            <div className="input-group input-container">
              <input
                type="search"
                className="form-control search-input"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="button"
                className="search-button"
                onClick={() => submitSearchInput(searchInput)}
              >
                <img
                  src={searchIcon}
                  alt="search icon"
                  className="search-icon"
                />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#home"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Account
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <a className="dropdown-item" href="#home">
                  View Account
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#home">
                  Logout
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#home">
                  Delete account
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#home">
                Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#home">
                Cart
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
