const initialState = {
  address: [],
  cardInfo: [],
  cart: [],
  email: "",
  firstName: "",
  lastName: "",
  orders: [],
  password: "",
  savedForLater: [],
  _id: "",
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        address: action.payload.address,
        cardInfo: action.payload.cardInfo,
        cart: action.payload.cart,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        orders: action.payload.orders,
        password: action.payload.password,
        savedForLater: action.payload.savedForLater,
        _id: action.payload._id,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
