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
        name: userInfo.name,
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
        console.log("going wrong herer");
        dispatch({
          type: "REGISTER_SUCCESS",
        });
        window.open("/login", "_self");
      }
    });
  } catch (error) {
    console.log(error + "here");
    dispatch({
      type: "REGISTER_FAILURE",
      error,
    });
  }
};
