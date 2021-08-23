import React from "react";
import { ProductList } from "../Product-List/ProductList";
import { Sidebar } from "../Sidebar/Sidebar";
import { Navigation } from "../Navbar/Navigation";
import { useSelector } from "react-redux";

import "./HomeView.css";

export const HomeView = () => {
  const currentView = useSelector((state) => state.userInfoReducer.currentView);

  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      {currentView ? <h1 className="current-view-title">{currentView}</h1> : ""}
      <div className="component-container">
        <Sidebar />
        <ProductList />
      </div>
    </>
  );
};
