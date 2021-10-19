import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import manImageOne from "./man-image-one.jpg";
import manImageTwo from "./man-image-two.jpg";
import womenImageOne from "./women-image-one.jpg";
import womenImageTwo from "./women-image-two.jpg";
import pastTrends from "./past-trends.jpeg";

import "./LandingPage.css";

export const LandingPage = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  const dispatch = useDispatch();

  //filters all products by their gender
  const filterByGender = (gender, view) => {
    const productsByGender = allProducts.filter((product) => {
      return product.gender === gender;
    });

    dispatch({
      type: "SET_CURRENT_VIEW",
      payload: view,
    });

    dispatch({
      type: "PRODUCTS_FILTERED",
      payload: productsByGender,
    });
  };

  return (
    <div className="landing-page-container">
      <div className="limited-time-container">
        <div className="intro-text">
          <p className="limited-time">LIMITED TIME</p>
          <p className="promotion-details">Up to 75% off select items</p>
        </div>
        <div className="quick-links">
          <NavLink to="/products">
            <button
              onClick={() => filterByGender("male", "Men's")}
              className="shop-mens"
            >
              SHOP MEN'S
            </button>
          </NavLink>
          <NavLink to="/products">
            <button
              onClick={() => filterByGender("female", "Women's")}
              className="shop-womens"
            >
              SHOP WOMEN'S
            </button>
          </NavLink>
        </div>
      </div>
      {/* <div className="wild-sale-container">
        <img src={clothesOnRack} alt="clothing" className="wild-sale-img" />
        <div className="wild-sale-text-container">
          <p className="wild">Store Wide</p>
          <p className="sale">Sale</p>
          <p className="sale-percent">up to 75% off</p>
        </div>
      </div> */}
      <div className="fall-collection-text-container">
        <h1 className="fall-collection-text">Shop our new fall collection</h1>
      </div>
      <div className="fall-collection-container">
        <div className="fall-collection-buttons">
          <NavLink to="/products">
            <button
              onClick={() => filterByGender("male", "Men's")}
              className="fall-collection-shop-mens"
            >
              shop men's
            </button>
          </NavLink>
          <NavLink to="/products">
            <button
              onClick={() => filterByGender("female", "Women's")}
              className="fall-collection-shop-womens"
            >
              shop women's
            </button>
          </NavLink>
        </div>
        <div className="man-image-container-one">
          <img className="manImageOne" alt="mens sweater" src={manImageOne} />
        </div>
        <div className="women-image-container-one">
          <img
            className="womenImageOne"
            alt="womens sweater"
            src={womenImageOne}
          />
        </div>
        <div className="man-image-container-two">
          <img className="manImageTwo" alt="mens sweater" src={manImageTwo} />
        </div>
        <div className="women-image-container-two">
          <img
            className="womenImageTwo"
            alt="womens sweater"
            src={womenImageTwo}
          />
        </div>
      </div>
      <div className="past-trends-container">
        <div className="past-trends-text-container">
          <p className="past-trends-alert" id="arc-text">
            trend edit
          </p>
          <p className="past-is-back">Rep the 90s</p>
          <p className="past-trends-text">The past is now the present</p>
        </div>
        <img className="past-trends-img" alt="past trends" src={pastTrends} />
      </div>
    </div>
  );
};
