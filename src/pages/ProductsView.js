import React from "react";
import { ProductList } from "../components/Product-List/ProductList";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Navigation } from "../components/Navbar/Navigation";
import { useSelector } from "react-redux";

export const ProductsView = () => {
  const currentView = useSelector((state) => state.userInfoReducer.currentView);
  return (
    <>
      <div className="navigation-container">
        <Navigation />
        {currentView ? (
          <h1 className="current-view-title">{currentView}</h1>
        ) : (
          ""
        )}
        <div className="component-container">
          <Sidebar />
          <ProductList />
        </div>
      </div>
    </>
  );
};
