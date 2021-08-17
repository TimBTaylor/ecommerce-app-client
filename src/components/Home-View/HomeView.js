import React from "react";
import { ProductList } from "../Product-List/ProductList";
import { Sidebar } from "../Sidebar/Sidebar";
import { Navigation } from "../Navbar/Navigation";

import "./HomeView.css";

export const HomeView = () => {
  return (
    <>
      <div className="navigation-container">
        <Navigation />
      </div>
      <div className="component-container">
        <Sidebar />
        <ProductList />
      </div>
    </>
  );
};
