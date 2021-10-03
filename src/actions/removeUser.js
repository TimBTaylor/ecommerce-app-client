import axios from "axios";

export const removeUser = (userId) => async (dispatch) => {
  try {
    await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/info/${userId}/delete-user`,
      header: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      localStorage.clear();
    });
  } catch (error) {
    dispatch({
      type: "SET_USER_FAILURE",
      payload: error,
    });
  }
};
