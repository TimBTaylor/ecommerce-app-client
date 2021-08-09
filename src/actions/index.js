import axios from "axios";

export const login = (userInfo) => async (dispatch) => {
  dispatch({
    type: "SET_INFO_REQUEST",
  });

  try {
    const response = await axios({
      method: "post",
      url: "https://ecommersappbytim.herokuapp.com/auth/login",
      header: { "Content-Type": "application/json" },
      data: {
        email: userInfo.email,
        password: userInfo.password,
      },
    });

    dispatch({
      type: "SET_INFO_SUCCESS",
      payload: response.data.user,
    });
    console.log(response.data.user);
  } catch (error) {
    dispatch({
      type: "SET_INFO_FAILURE",
      error,
    });
  }
};
