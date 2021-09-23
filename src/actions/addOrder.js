import axios from "axios";

export const addOrder = (userId, orderInformation) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/new-order`,
      header: {
        "Content-Type": "application/json",
      },
      data: {
        products: orderInformation.products,
        total: orderInformation.total,
        quantity: orderInformation.quantity,
        orderNumber: orderInformation.orderNumber,
      },
    }).then((response) => {
      console.log(response);
      dispatch({
        type: "SET_ORDER",
        payload: response.data,
      });
      dispatch({
        type: "SET_USER_LOADING_TRUE",
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
