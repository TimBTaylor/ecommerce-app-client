import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { Home } from "./Home";
import { WhatsNew } from "../components/Whats-New/WhatsNew";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const MainView = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/whats-new" component={WhatsNew} />
      </Router>
    </div>
  );
};
