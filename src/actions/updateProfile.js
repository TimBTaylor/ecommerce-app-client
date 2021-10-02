import axios from "axios";

export const updateProfile = (userId, userInfo, props) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const name = localStorage.getItem("firstName");
  console.log(name);

  if (name === null) {
    props.history.push("/login");
  } else {
    dispatch({
      type: "SET_USER_LOADING_TRUE",
    });

    try {
      await axios({
        method: "post",
        url: `https://ecommersappbytim.herokuapp.com/info/${userId}/update-user`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "auth-token": token,
        },
        data: {
          firstName: userInfo.fName,
          lastName: userInfo.lName,
          email: userInfo.email,
          password: userInfo.password,
        },
      }).then((response) => {
        console.log(response);
        dispatch({
          type: "SET_USER_INFO",
          payload: response.data,
        });

        dispatch({
          type: "SET_USER_LOADING_FALSE",
        });
      });
    } catch (error) {
      console.log(error);
      console.log(error.message);
      dispatch({
        type: "SET_USER_FAILURE",
        payload: error,
      });
    }
  }
};
