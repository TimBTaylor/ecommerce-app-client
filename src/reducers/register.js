const initialState = {
  loading: false,
  error: null,
  data: {},
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        data: {
          Registered: false,
        },
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        data: {
          Registered: true,
        },
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
        data: {
          Registered: false,
        },
      };
    default:
      return state;
  }
};

export default registerReducer;
