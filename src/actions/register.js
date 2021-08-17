import axios from "axios";

export const register = (userInfo) => async (dispatch) => {
  dispatch({
    type: "REGISTER_REQUEST",
  });

  try {
    await axios({
      method: "post",
      url: "https://ecommersappbytim.herokuapp.com/auth/register",
      header: { "Content-Type": "application/json" },
      data: {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
      },
    }).then((response) => {
      if (response.data === "Email already in use") {
        dispatch({
          type: "REGISTER_FAILURE",
          payload: true,
        });
      } else {
        dispatch({
          type: "REGISTER_SUCCESS",
        });
      }
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "REGISTER_FAILURE",
      error,
    });
  }
};
