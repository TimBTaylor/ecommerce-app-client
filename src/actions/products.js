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
      const categorys = response.data.map((product) => {
        return product.category;
      });
      dispatch({
        type: "PRODUCT_CATEGORYS",
        payload: categorys,
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
