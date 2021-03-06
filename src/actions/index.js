import axios from "axios";

export const login = (userInfo, props) => async (dispatch) => {
  dispatch({
    type: "LOGIN_REQUEST",
  });

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
          type: "SET_GUEST",
          payload: false,
        });
        dispatch({
          type: "SET_USER_INFO",
          payload: response.data.user,
        });
        dispatch({
          type: "SET_TOKEN",
          payload: response.data.token,
        });
        localStorage.setItem("firstName", response.data.user.firstName);
        localStorage.setItem("lastName", response.data.user.lastName);
        localStorage.setItem("password", response.data.user.password);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: "LOGIN_SUCCESS",
        });
        props.history.push("/home");
      }
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      error,
    });
  }
};
