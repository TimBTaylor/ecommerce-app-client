import axios from "axios";

export const removeOrder = (userId, orderId) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/order/${userId}/delete-order`,
      header: {
        "Content-Type": "application/json",
      },
      data: {
        orderId,
      },
    }).then((response) => {
      dispatch({
        type: "SET_ORDER",
        payload: response.data,
      });
      dispatch({
        type: "SET_USER_LOADING_FALSE",
      });
    });
  } catch (error) {
    dispatch({
      type: "SET_ORDER_FAILURE",
      error,
    });
    dispatch({
      type: "SET_USER_LOADING_FALSE",
    });
  }
};
