import axios from "axios";

export const product = () => async (dispatch) => {
  dispatch({
    type: "PRODUCTS_REQUESTED",
  });

  try {
    await axios({
      method: "get",
      url: "https://ecommersappbytim.herokuapp.com/product/all-products",
      header: { "Content-Type": "application/json" },
    }).then((response) => {
      dispatch({
        type: "PRODUCTS_SUCCESS",
        payload: response.data,
      });
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "PRODUCTS_FAILURE",
      error,
    });
  }
};
