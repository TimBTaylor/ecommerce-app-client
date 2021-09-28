import axios from "axios";

export const addCard = (userId, cardInfo) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/card/${userId}/add-card`,
      header: { "Content-Type": "application/json" },
      data: {
        name: cardInfo.name,
        cardNumber: cardInfo.cardNumber,
        type: cardInfo.type,
        expiration: cardInfo.expiration,
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
