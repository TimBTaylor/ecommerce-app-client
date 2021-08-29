const initialState = {
  address: [],
  cardInfo: [],
  cart: [],
  email: "",
  firstName: "",
  lastName: "",
  orders: [],
  password: "",
  wishlist: [],
  _id: "",
  currentView: "",
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
        wishlist: action.payload.wishlist,
        _id: action.payload._id,
      };
    case "SET_CURRENT_VIEW":
      return {
        ...state,
        currentView: action.payload,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
