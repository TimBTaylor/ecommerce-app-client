import axios from "axios";

export const updateCard = (userId, cardInfo) => async (dispatch) => {
  dispatch({
    type: "SET_USER_LOADING_TRUE",
  });

  try {
    await axios({
      method: "put",
      url: `https://ecommersappbytim.herokuapp.com/card/${userId}/update-card`,
      header: { "Content-Type": "application/json" },
      data: {
        name: cardInfo.name,
        cardNumber: cardInfo.cardNumber,
        type: cardInfo.type,
        expiration: cardInfo.expiration,
        cardId: cardInfo.cardId,
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
