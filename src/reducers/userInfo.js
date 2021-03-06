const initialState = {
  loading: false,
  error: false,
  address: [],
  cardInfo: [],
  cart: [],
  email: "",
  firstName: "",
  lastName: "",
  orders: [],
  password: "",
  token: "",
  wishlist: [],
  _id: "",
  currentView: "",
  modalProduct: "",
  productView: "",
  currentProductReview: "",
  guest: true,
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
    case "SET_USER_FAILURE":
      return {
        ...state,
        error: action.erorr,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
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
    case "SET_MODAL_PRODUCT":
      return {
        ...state,
        modalProduct: action.payload,
      };
    case "SET_PRODUCT_VIEW":
      return {
        ...state,
        productView: action.payload,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    case "SET_ADDRESS_FAILURE":
      return {
        ...state,
        error: action.error,
      };
    case "SET_CARD":
      return {
        ...state,
        cardInfo: action.payload,
      };
    case "SET_CARD_FAILURE":
      return {
        ...state,
        error: action.error,
      };
    case "SET_CURRENT_PRODUCT_REVIEW":
      return {
        ...state,
        currentProductReview: action.payload,
      };
    case "SET_GUEST":
      return {
        ...state,
        guest: action.payload,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
