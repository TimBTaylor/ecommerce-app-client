import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import clothesOnRack from "./long-photo.jpeg";
import manImageOne from "./man-image-one.jpg";
import manImageTwo from "./man-image-two.jpg";
import womenImageOne from "./women-image-one.jpg";
import womenImageTwo from "./women-image-two.jpg";
import pastTrends from "./past-trends.jpeg";

import "./LandingPage.css";

export const LandingPage = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  const dispatch = useDispatch();

  const filterByGender = (gender) => {
    const productsByGender = allProducts.filter((product) => {
      return product.gender === gender;
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
          <Link to="/products">
            <button
              onClick={() => filterByGender("male")}
              className="shop-mens"
            >
              SHOP MEN'S
            </button>
          </Link>
          <Link to="/products">
            <button
              onClick={() => filterByGender("female")}
              className="shop-womens"
            >
              SHOP WOMEN'S
            </button>
          </Link>
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
          <Link to="/products">
            <button
              onClick={() => filterByGender("male")}
              className="fall-collection-shop-mens"
            >
              shop men's
            </button>
          </Link>
          <Link to="/products">
            <button
              onClick={() => filterByGender("female")}
              className="fall-collection-shop-womens"
            >
              shop women's
            </button>
          </Link>
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
