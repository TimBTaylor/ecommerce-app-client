import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { register } from "../../actions/register";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./RegisterForm.css";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [firstPassword, setFirstPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [match, setMatch] = useState(true);
  const dispatch = useDispatch();

  const registerUser = () => {
    const userInfo = {
      name,
      email,
      password,
    };
    const emailRegex = /\S+@\S+\.\S+/;
    const emailValidation = emailRegex.test(email);
    if (name.length >= 2) {
      if (emailValidation) {
        if (firstPassword.length >= 6) {
          if (firstPassword === password) {
            dispatch(register(userInfo));
          } else {
            setMatch(false);
            setNameValid(true);
            setEmailValid(true);
            setPasswordValid(true);
          }
        } else {
          setPasswordValid(false);
          setEmailValid(true);
          setNameValid(true);
        }
      } else {
        setNameValid(true);
        setEmailValid(false);
      }
    } else {
      setNameValid(false);
    }
  };

  return (
    <div className="form-container">
      <Container>
        <Form className="form">
          <Form.Group className="form-group">
            <Form.Label className="form-label">Your Name</Form.Label>
            <Form.Control
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
            {nameValid ? (
              ""
            ) : (
              <Form.Text className="text-muted name-invalid">
                ! Must enter your name
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailValid ? (
              ""
            ) : (
              <Form.Text className="text-muted email-invalid">
                ! Must enter a valid email
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              placeholder="At least 6 characters"
              className="password-control"
              onChange={(e) => setFirstPassword(e.target.value)}
              type="password"
            />
            {passwordValid ? (
              <Form.Text className="text-muted">
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
          <Button
            className="create-button"
            variant="primary"
            onClick={() => registerUser()}
          >
            Create Account
          </Button>
          <h6 className="account-question">Already have an account?</h6>
          <Link to={"/login"}>
            <h6 className="sign-in">Sign in here</h6>
          </Link>
        </Form>
      </Container>
    </div>
  );
};
