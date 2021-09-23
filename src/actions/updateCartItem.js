import axios from "axios";

export const updateCartItem =
  (userId, productId, quantity, size) => async (dispatch) => {
    dispatch({
      type: "SET_USER_LOADING_TRUE",
    });

    try {
      await axios({
        method: "put",
        url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/update-cart-item`,
        header: { "Content-Type": "application/json" },
        data: {
          newItem: {
            productId,
            quantity,
            size,
          },
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
      console.log(error);
      dispatch({
        type: "SET_CART_FAILURE",
        error,
      });
      dispatch({
        type: "SET_USER_LOADING_FALSE",
      });
    }
  };
