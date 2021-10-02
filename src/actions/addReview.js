import axios from "axios";
import { useSelector } from "react-redux";

export const addReview = (productInfo) => async (dispatch) => {
  // const allProducts = useSelector((state) => state.productReducer.data);

  //the issue is using useSelector so firuger it out

  let newProductList;

  let productIndex;

  // allProducts.map((product) => {
  //   if (product._id === productInfo.productId) {
  //     productIndex = allProducts.indexOf(product);
  //   }
  //   return product;
  // });

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
        productId: "61206823d8b4510016879944",
      },
    }).then((response) => {
      console.log(response);
      // newProductList = allProducts.splice(productIndex, 1, response.data);
      // dispatch({
      //   type: "PRODUCTS_SUCCESS",
      //   payload: newProductList,
      // });
    });
  } catch (error) {
    dispatch({
      type: "PRODUCTS_FAILURE",
      payload: error,
    });
  }
};
