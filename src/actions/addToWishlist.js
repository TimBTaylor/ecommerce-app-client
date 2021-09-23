import axios from "axios";

export const addToWishlist =
  (userId, productId, quantity, size) => async (dispatch) => {
    dispatch({
      type: "SET_USER_LOADING_TRUE",
    });

    try {
      await axios({
        method: "put",
        url: `https://ecommersappbytim.herokuapp.com/saved/${userId}/add-to-saved`,
        header: { "Content-Type": "application/json" },
        data: {
          productId,
          quantity,
          size,
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
