const initialState = {
  data: {
    emailValid: true,
    passwordValid: true,
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
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        data: {
          emailValid: true,
          passwordValid: true,
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    case "LOGIN_EMAIL_FAILED":
      return {
        ...state,
        loading: false,
        data: {
          emailValid: action.payload,
          passwordValid: true,
        },
      };
    case "LOGIN_PASSWORD_FAILED":
      return {
        ...state,
        loading: false,
        data: {
          emailValid: true,
          passwordValid: action.payload,
        },
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
