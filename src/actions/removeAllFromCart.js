import axios from "axios";

export const removeAllFromCart = (userId) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/remove-all-from-cart`,
      header: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      dispatch({
        type: "SET_CART",
        payload: response.data.cart,
      });
      dispatch({
        type: "SET_USER_LOADING_FALSE",
      });
    });
  } catch (error) {
    dispatch({
      type: "SET_CART_FAILURE",
      error,
    });
    dispatch({
      type: "SET_USER_LOADING_FALSE",
    });
  }
};
