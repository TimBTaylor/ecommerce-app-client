import axios from "axios";

export const product = () => async (dispatch) => {
  const getBrands = (productsOfTheBrands) => {
    const allBrands = [];
    productsOfTheBrands.map((product) => {
      return allBrands.push(product.brand);
    });
    const filteredBrands = [];
    allBrands.map((brand) => {
      if (filteredBrands.includes(brand)) {
      } else {
        filteredBrands.push(brand);
      }
      return filteredBrands;
    });
    dispatch({
      type: "PRODUCTS_BRANDS",
      payload: filteredBrands,
    });
  };

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
      getBrands(response.data);
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "PRODUCTS_FAILURE",
      error,
    });
  }
};
