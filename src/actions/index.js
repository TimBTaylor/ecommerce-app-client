import axios from "axios";

export const login = (userInfo) => async (dispatch) => {
  dispatch({
    type: "LOGIN_REQUEST",
  });
  console.log(userInfo);

  try {
    await axios({
      method: "post",
      url: "https://ecommersappbytim.herokuapp.com/auth/login",
      header: { "Content-Type": "application/json" },
      data: {
        email: userInfo.email,
        password: userInfo.password,
      },
    }).then((response) => {
      console.log(response.data);
      if (response.data.message === "Login failed at email") {
        return dispatch({
          type: "LOGIN_EMAIL_FAILED",
          payload: false,
        });
      }
      if (response.data.message === "Login failed at password") {
        dispatch({
          type: "LOGIN_PASSWORD_FAILED",
          payload: false,
        });
      } else {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.user,
        });
        window.open("/home", "_self");
      }
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      error,
    });
  }
};
