import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/action.auth";

const Login = ({ login }) => {
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = loginData;

  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(name, email, password);
  };

  return (
    <div>
      <h1>Sign in to your Account</h1>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            onChange(e);
          }}
          placeholder="name"
          autoComplete="on"
          name="name"
        />
        <input
          type="text"
          onChange={(e) => {
            onChange(e);
          }}
          placeholder="email"
          autoComplete="on"
          name="email"
        />
        <input
          type="password"
          onChange={(e) => {
            onChange(e);
          }}
          placeholder="password"
          autoComplete="on"
          name="password"
        />
        <button type="submit">LOGIN</button>
      </form>
      <h6>
        Dont have an accout?<Link to="./Register">Create Account</Link>
      </h6>
    </div>
  );
};

export default connect(null, { login })(Login);
