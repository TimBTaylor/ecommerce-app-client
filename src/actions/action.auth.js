import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGSTER_FAILED,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILED,
  LOGOUT_USER,
} from "./action.types";

//login request
export const login = (name, email, password) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const body = { name, email, password };

  try {
    const res = await axios.post(
      `{process.env.REACT_APP_API_URL}/auth/login`,
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    console.log("user logged in");
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};
