import axios from "axios";
import { useSelector } from "react-redux";

export const addReview = (productInfo) => async (dispatch) => {
  const allProducts = useSelector((state) => state.productReducer.data);

  let newProductList;

  let productIndex;

  allProducts.map((product) => {
    if (product._id === productInfo.productId) {
      productIndex = allProducts.indexOf(product);
    }
    return product;
  });

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
    }).then((response) => {
      console.log(response);
      newProductList = allProducts.splice(productIndex, 1, response.data);
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
