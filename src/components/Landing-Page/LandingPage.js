import React from "react";
import maleSweater from "./men-sweater.jpg";
import womenSweater from "./women-sweater.jpg";
import fallCollection from "./fall-collection.jpg";

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
      <div className="image-container">
        <img
          src={maleSweater}
          alt="male sweater"
          className="male-sweater-img"
        />
        <div className="small-image-text-container">
          <h4 className="small-just-dropped">JUST DROPPED</h4>
          <h1 className="small-sweater-weather">It's sweater weather</h1>
          <h6 className="small-shop-new-sweaters">
            ease into fall with out new sweaters
          </h6>
        </div>
        <div className="image-text-container">
          <h4 className="just-dropped">JUST DROPPED</h4>
          <h1 className="sweater-weather">It's sweater weather</h1>
          <h6 className="shop-new-sweaters">
            ease into fall with our new sweaters
          </h6>
        </div>
        <img
          src={womenSweater}
          alt="women sweater"
          className="women-sweater-img"
        />
      </div>
      <div className="fall-image-container">
        <img src={fallCollection} alt="fall" className="fall-image" />
      </div>
    </div>
  );
};
