const initialState = {
  data: {},
  loading: false,
  error: null,
};

const personalInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INFO_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SET_INFO_SUCCESS":
      return {
        ...state,
        loading: false,
        data: {
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    case "SET_INFO_FAILURE":
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

export default personalInfoReducer;
