import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { Home } from "./Home";
import { ProductsView } from "./ProductsView";
import { Profile } from "./Profile";
import { PersonalInfoUpdate } from "./PersonalInfoUpdate";
import { AddressView } from "./AddressView";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CreditCardView } from "./CreditCardView";
import { WishlistView } from "./WishlistView";

export const MainView = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/products" component={ProductsView} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile-update" component={PersonalInfoUpdate} />
        <Route exact path="/profile-address" component={AddressView} />
        <Route exact path="/profile-card" component={CreditCardView} />
        <Route exact path="/wishlist" component={WishlistView} />
      </Router>
    </div>
  );
};
