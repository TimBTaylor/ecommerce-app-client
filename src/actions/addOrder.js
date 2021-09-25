import axios from "axios";

export const addOrder = (userId, orderInformation) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/order/${userId}/new-order`,
      header: {
        "Content-Type": "application/json",
      },
      data: {
        products: orderInformation.products,
        total: orderInformation.total,
        quantity: orderInformation.quantity,
        orderNumber: orderInformation.orderNumber,
        shippingType: orderInformation.shippingType,
        date: orderInformation.date,
        name: orderInformation.name,
      },
    }).then((response) => {
      dispatch({
        type: "SET_ORDER",
        payload: response.data.orders,
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
