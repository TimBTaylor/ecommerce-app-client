import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { Home } from "./Home";
import { ProductsView } from "./ProductsView";
import { Profile } from "./Profile";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const MainView = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/products" component={ProductsView} />
        <Route exact path="/profile" component={Profile} />
      </Router>
    </div>
  );
};
