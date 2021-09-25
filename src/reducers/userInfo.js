const initialState = {
  loading: false,
  error: false,
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
    case "SET_USER_LOADING_TRUE":
      return {
        ...state,
        loading: true,
      };
    case "SET_USER_LOADING_FALSE":
      return {
        ...state,
        loading: false,
      };
    case "SET_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
      };
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "SET_WISHLIST_FAILURE":
      return {
        ...state,
        error: action.error,
      };
    case "SET_CART_FAILURE":
      return {
        ...state,
        error: action.error,
      };
    case "SET_ORDER":
      return {
        ...state,
        orders: action.payload,
      };
    case "SET_ORDER_FAILURE":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
