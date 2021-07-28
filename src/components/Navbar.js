import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../action/action.auth";

const Navbar = ({ logout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default connect(null, { logout })(Navbar);
