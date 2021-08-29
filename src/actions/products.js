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
      const womenPantSize = ["000", "00", "0", "1", "2", "4", "6", "8"];

      const menPantSize = [
        "26 X 28",
        "26 X 30",
        "28 X 28",
        "28 X 30",
        "28 X 32",
        "28 X 34",
        "30 X 30",
        "30 X 32",
        "30 X 34",
        "30 X 36",
        "32 X 32",
        "32 X 34",
        "32 X 36",
        "34 X 30",
        "34 X 32",
        "34 X 34",
        "34 X 36",
        "36 X 30",
        "36 X 32",
        "36 X 34",
        "36 X 36",
        "38 X 30",
        "38 X 32",
        "38 X 34",
        "38 X 36",
      ];

      const shirtSize = [
        "Extra Small",
        "Small",
        "Medium",
        "Large",
        "Extra Large",
      ];
      const productsWithSizes = [];
      response.data.map((product) => {
        if (product.category === "mens" && product.type === "pants") {
          let size = menPantSize;
          product.sizes = size;
          return productsWithSizes.push(product);
        } else if (product.category === "womens" && product.type === "pants") {
          let size = womenPantSize;
          product.sizes = size;
          return productsWithSizes.push(product);
        } else if (product.type === "shirt" || product.type === "sweater") {
          let size = shirtSize;
          product.sizes = size;
          return productsWithSizes.push(product);
        }
        return productsWithSizes;
      });
      dispatch({
        type: "PRODUCTS_SUCCESS",
        payload: productsWithSizes,
      });
      getBrands(productsWithSizes);
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "PRODUCTS_FAILURE",
      error,
    });
  }
};
