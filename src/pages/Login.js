import React from "react";
import { LoginForm } from "../components/Login-View/LoginForm";
import { useSelector } from "react-redux";

export const Login = () => {
  const isLoading = useSelector((state) => state.personalInfoReducer.loading);
  return <div>{isLoading ? <h1>Loading</h1> : <LoginForm />}</div>;
};
