import axios from "axios";

export const removeFromWishlist = (userId, productId) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });
  try {
    await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/saved/${userId}/delete-from-saved`,
      header: { "Content-Type": "application/json" },
      data: {
        productId,
      },
    }).then((response) => {
      dispatch({
        type: "SET_WISHLIST",
        payload: response.data,
      });
      dispatch({
        type: "SET_USER_LOADING_FALSE",
      });
    });
  } catch (error) {
    dispatch({
      type: "SET_WISHLIST_FAILURE",
      error,
    });
    dispatch({
      type: "SET_USER_LOADING_FALSE",
    });
  }
};
