import axios from "axios";

export const addToCart =
  (userId, productId, quantity, size) => async (dispatch) => {
    dispatch({
      type: "SET_USER_LOADING_TRUE",
    });

    try {
      await axios({
        method: "put",
        url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/add-to-cart`,
        header: {
          "Content-Type": "application/json",
        },
        data: {
          productId,
          quantity,
          size,
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
