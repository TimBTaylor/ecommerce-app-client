import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { login } from "../../actions";
import { Link } from "react-router-dom";
import shoppingcart from "../Register-View/shopping-cart.svg";

import "./LoginForm.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailValid = useSelector((state) => state.loginReducer.data.emailValid);
  const passwordValid = useSelector(
    (state) => state.loginReducer.data.passwordValid
  );
  const dispatch = useDispatch();

  const LogIn = () => {
    const userInfo = {
      email,
      password,
    };
    dispatch(login(userInfo));
  };

  return (
    <div>
      <div className="logo">
        <h1 className="timazon">Timazon</h1>
        <img className="cart" src={shoppingcart} alt="shopping cart" />
      </div>
      <div className="form-container">
        <Form className="form">
          <Form.Group className="form-group">
            <Form.Label className="form-labl">Email</Form.Label>
            <Form.Control
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailValid ? (
              ""
            ) : (
              <Form.Text className="email-invalid">! Email not found</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label className="form-labl">Password</Form.Label>
            <Form.Control
              className="form-control"
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
        </Form>
      </div>
    </div>
  );
};
