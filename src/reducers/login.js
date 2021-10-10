const initialState = {
  data: {
    emailValid: true,
    passwordValid: true,
    name: null,
  },
  loading: false,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_GUEST_REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        data: {
          emailValid: true,
          passwordValid: true,
          name: action.payload,
        },
        error: null,
      };
    case "LOGIN_EMAIL_FAILED":
      return {
        ...state,
        loading: false,
        data: {
          emailValid: action.payload,
          passwordValid: true,
        },
        error: true,
      };
    case "LOGIN_PASSWORD_FAILED":
      return {
        ...state,
        loading: false,
        data: {
          emailValid: true,
          passwordValid: action.payload,
        },
        error: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
        data: {},
      };

    default:
      return state;
  }
};

export default loginReducer;
