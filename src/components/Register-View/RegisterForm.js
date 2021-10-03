import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { register } from "../../actions/register";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import shoppingcart from "./shopping-cart.svg";
import { withRouter } from "react-router-dom";
import { product } from "../../actions/products";

import "./RegisterForm.css";

const RegisterForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [firstPassword, setFirstPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [match, setMatch] = useState(true);
  const dispatch = useDispatch();

  const emailTaken = useSelector((state) => state.registerReducer.emailTaken);

  const registerUser = () => {
    setFirstNameValid(true);
    setLastNameValid(true);
    setEmailValid(true);
    setPasswordValid(true);
    setMatch(true);
    const userInfo = {
      firstName,
      lastName,
      email,
      password,
    };
    const emailRegex = /\S+@\S+\.\S+/;
    const emailValidation = emailRegex.test(email);
    if (firstName.length >= 2) {
      if (lastName.length >= 2) {
        if (emailValidation) {
          if (firstPassword.length >= 6) {
            if (firstPassword === password) {
              dispatch(register(userInfo)).then(() => {
                props.history.push("/login");
              });
            } else {
              setMatch(false);
              setFirstNameValid(true);
              setLastNameValid(true);
              setEmailValid(true);
              setPasswordValid(true);
            }
          } else {
            setPasswordValid(false);
            setEmailValid(true);
            setFirstNameValid(true);
            setLastNameValid(true);
          }
        } else {
          setFirstNameValid(true);
          setLastNameValid(true);
          setEmailValid(false);
        }
      } else {
        setFirstNameValid(true);
        setLastNameValid(false);
      }
    } else {
      setFirstNameValid(false);
    }
  };

  const continueAsGuest = () => {
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
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="form-control"
              onChange={(e) => setFirstName(e.target.value)}
            />
            {firstNameValid ? (
              ""
            ) : (
              <Form.Text className="text-muted name-invalid">
                ! Must enter your name
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="form-control"
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastNameValid ? (
              ""
            ) : (
              <Form.Text className="text-muted name-invalid">
                ! Must enter your last name
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailValid ? (
              emailTaken ? (
                <Form.Text className="text-muted email-taken">
                  ! Email is already in use
                </Form.Text>
              ) : (
                ""
              )
            ) : (
              <Form.Text className="text-muted email-invalid">
                ! Must enter a valid email
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="At least 6 characters"
              className="password-control"
              onChange={(e) => setFirstPassword(e.target.value)}
              type="password"
            />
            {passwordValid ? (
              <Form.Text className="text-muted password-text">
                Passwords must be at least 6 characters.
              </Form.Text>
            ) : (
              <Form.Text className="text-muted password-invalid">
                ! Passwords must be at least 6 characters.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label className="form-label secondary-label">
              Re-enter Password
            </Form.Label>
            <Form.Control
              className="password-control"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            {match ? (
              ""
            ) : (
              <Form.Text className="text-muted passwords-match">
                ! Passwords must match
              </Form.Text>
            )}
          </Form.Group>
          <button
            type="button"
            className="create-button"
            onClick={() => registerUser()}
          >
            Create Account
          </button>
          <h6 className="account-question">Already have an account?</h6>
          <Link to={"/login"}>
            <h6 className="sign-in">Sign in here</h6>
          </Link>
          {/* continue as guest */}
          <p className="guest" onClick={() => continueAsGuest()}>
            Continue as guest
          </p>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(RegisterForm);
