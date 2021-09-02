import React from "react";

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
    </div>
  );
};
