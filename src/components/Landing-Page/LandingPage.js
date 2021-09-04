import React from "react";
import clothesOnRack from "./long-photo.jpeg";
import manSweater from "./men-sweater.jpg";
import womenSweater from "./women-sweater.jpg";
import manImageOne from "./man-image-one.jpg";
import manImageTwo from "./man-image-two.jpg";
import womenImageOne from "./women-image-one.jpg";
import womenImageTwo from "./women-image-two.jpg";

import "./LandingPage.css";

export const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="limited-time-container">
        <div className="intro-text">
          <p className="limited-time">LIMITED TIME</p>
          <p className="promotion-details">Up to 75% off select items</p>
        </div>
        <div className="quick-links">
          <button className="shop-mens">SHOP MEN'S</button>
          <button className="shop-womens">SHOP WOMEN'S</button>
        </div>
      </div>
      <div className="wild-sale-container">
        <img src={clothesOnRack} alt="clothing" className="wild-sale-img" />
        <div className="wild-sale-text-container">
          <p className="wild">Store Wide</p>
          <p className="sale">Sale</p>
          <p className="sale-percent">up to 40% off</p>
        </div>
      </div>
      <div className="fall-collection-text-container">
        <p className="fall-collection-text">Shop our new fall collection</p>
      </div>
      <div className="fall-collection-container">
        <div className="fall-collection-buttons">
          <button className="fall-collection-shop-mens">shop men's</button>
          <button className="fall-collection-shop-womens">shop women's</button>
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
    </div>
  );
};
