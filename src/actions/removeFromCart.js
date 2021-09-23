import axios from "axios";

export const removeFromCart = (userId, productId) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/delete-from-cart`,
      header: { "Content-Type": "application/json" },
      data: {
        productId,
      },
    }).then((response) => {
      dispatch({
        type: "SET_CART",
        payload: response.data,
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
