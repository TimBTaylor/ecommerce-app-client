import axios from "axios";

export const removeCard = (userId, cardId) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/card/${userId}/delete-card`,
      header: { "Content-Type": "application/json" },
      data: {
        cardId,
      },
    }).then((response) => {
      dispatch({
        type: "SET_CARD",
        payload: response.data,
      });
      dispatch({
        type: "SET_USER_LOADING_FALSE",
      });
    });
  } catch (error) {
    dispatch({
      type: "SET_CARD_FAILURE",
      error,
    });
    dispatch({
      type: "SET_USER_LOADING_FALSE",
    });
  }
};
