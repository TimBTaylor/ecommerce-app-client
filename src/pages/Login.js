import React from "react";
import LoginForm from "../components/Login-View/LoginForm";
import { LoadingAnimation } from "../components/Loading-Animation/LoadingAnimation";
import { useSelector } from "react-redux";

export const Login = () => {
  const isLoading = useSelector((state) => state.loginReducer.loading);
  return <div>{isLoading ? <LoadingAnimation /> : <LoginForm />}</div>;
};
