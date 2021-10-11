import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { login } from "../../actions";
import { Link } from "react-router-dom";
import shoppingcart from "../Register-View/shopping-cart.svg";
import { withRouter } from "react-router-dom";
import { product } from "../../actions/products";

import "./LoginForm.css";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailValid = useSelector((state) => state.loginReducer.data.emailValid);
  const passwordValid = useSelector(
    (state) => state.loginReducer.data.passwordValid
  );
  const dispatch = useDispatch();

  const LogIn = () => {
    let lowercaseEmail = email.toLowerCase();
    const userInfo = {
      email: lowercaseEmail,
      password,
    };

    dispatch(login(userInfo, props, true)).then(() => {
      const userGuest = false;
      dispatch(product(userGuest, props));
    });
  };

  const continueAsGuest = () => {
    dispatch({
      type: "LOGIN_REQUEST",
    });
    const userGuest = true;
    dispatch(product(userGuest, props));
  };

  return (
    <div>
      <div className="logo">
        <h1 className="timazon">T's</h1>
        <img className="cart" src={shoppingcart} alt="shopping cart" />
      </div>
      <div className="form-container">
        <Form className="form">
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={(e) => setEmail(e.target.value)} />
            {emailValid ? (
              ""
            ) : (
              <Form.Text className="email-invalid">! Email not found</Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            {passwordValid ? (
              ""
            ) : (
              <Form.Text className="password-invalid">
                ! Incorrect password
              </Form.Text>
            )}
          </Form.Group>
          <button className="sign-in-button" onClick={() => LogIn()}>
            Sign in
          </button>
          <h6 className="account-question">Don't have an account?</h6>
          <Link className="register" to={"/"}>
            Register here
          </Link>
          <p className="guest" onClick={() => continueAsGuest()}>
            Continue as guest
          </p>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(LoginForm);
