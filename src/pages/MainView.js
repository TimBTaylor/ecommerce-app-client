import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const MainView = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
      </Router>
    </div>
  );
};
