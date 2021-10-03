import axios from "axios";

export const updateProfile = (userId, userInfo, props) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/info/${userId}/update-user`,
      header: {
        "Content-Type": "application/json",
      },
      data: {
        firstName: userInfo.fName,
        lastName: userInfo.lName,
        email: userInfo.email,
        password: userInfo.password,
        orders: userInfo.orders,
        cardInfo: userInfo.cardInfo,
        wishlist: userInfo.wishlist,
        cart: userInfo.cart,
      },
    }).then((response) => {
      dispatch({
        type: "SET_USER_INFO",
        payload: response.data,
      });

      dispatch({
        type: "SET_USER_LOADING_FALSE",
      });
      props.history.push("/login");
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "SET_USER_FAILURE",
      payload: error,
    });
  }
};
