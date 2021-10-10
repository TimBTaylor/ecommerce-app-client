import React from "react";
import RegisterForm from "../components/Register-View/RegisterForm";
import { LoadingAnimation } from "../components/Loading-Animation/LoadingAnimation";
import { useSelector } from "react-redux";

export const Register = () => {
  const isLoading = useSelector((state) => state.loginReducer.loading);

  return <div>{isLoading ? <LoadingAnimation /> : <RegisterForm />}</div>;
};
