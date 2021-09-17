const initialState = {
  address: [
    {
      fName: "Tim",
      lName: "Taylor",
      Address: "176 3 35th st",
      City: "holland",
      State: "michigan",
      ZIP: "49423",
    },
  ],
  cardInfo: [
    {
      name: "tim taylor",
      cardNumber: "0000000000001234",
      expires: "09/24",
    },
  ],
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
        wishlist: action.payload.savedForLater,
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
