import React from "react";
import { HomeView } from "../components/Home-View/HomeView";
import { useSelector } from "react-redux";
import { Login } from "./Login";

export const Home = () => {
  const allProducts = useSelector((state) => state.productReducer.data);

  return (
    <>
      {allProducts.length > 0 ? (
        <div>
          <HomeView />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
