import axios from "axios";

export const removeAddress = (userId, addressId) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/address/${userId}/delete-address`,
      header: { "Content-Type": "application/json" },
      data: {
        addressId,
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
