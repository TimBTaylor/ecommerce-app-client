import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { login } from "../../actions";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
        <Button variant="primary" onClick={() => LogIn()}>
          Sign in
        </Button>
        <h6>Don't have an account?</h6>
        <Link to={"/"}>Register here</Link>
      </Form>
    </div>
  );
};
