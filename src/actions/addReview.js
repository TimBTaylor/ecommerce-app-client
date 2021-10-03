import axios from "axios";

export const addReview = (productInfo, newProductList) => async (dispatch) => {
  try {
    await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/product/product-review`,
      header: { "Content-Type": "application/json" },
      data: {
        name: productInfo.name,
        rating: productInfo.rating,
        description: productInfo.description,
        buyAgain: productInfo.buyAgain,
        productId: productInfo.productId,
      },
    }).then(() => {
      dispatch({
        type: "PRODUCTS_SUCCESS",
        payload: newProductList,
      });
    });
  } catch (error) {
    dispatch({
      type: "PRODUCTS_FAILURE",
      payload: error,
    });
  }
};
