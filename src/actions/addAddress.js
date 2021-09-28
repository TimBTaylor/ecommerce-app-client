import axios from "axios";

export const addAddress = (userId, addressInfo) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/address/${userId}/new-address`,
      header: { "Content-Type": "application/json" },
      data: {
        name: addressInfo.name,
        streetAddress: addressInfo.streetAddress,
        city: addressInfo.city,
        state: addressInfo.state,
        zipcode: addressInfo.zipcode,
      },
    }).then((response) => {
      dispatch({
        type: "SET_ADDRESS",
        payload: response.data,
      });
      dispatch({
        type: "SET_USER_LOADING_FALSE",
      });
    });
  } catch (error) {
    dispatch({
      type: "SET_ADDRESS_FAILURE",
      error,
    });
    dispatch({
      type: "SET_USER_LOADING_FALSE",
    });
  }
};
