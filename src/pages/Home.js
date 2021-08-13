import React from "react";
import { HomeView } from "../components/Home-View/HomeView";
import { Navigation } from "../components/Navbar/Navigation";

export const Home = () => {
  return (
    <div>
      <Navigation />
      <div>
        <HomeView />
      </div>
    </div>
  );
};
