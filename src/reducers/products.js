const initialState = {
  loading: false,
  error: null,
  data: [],
  filteredData: [],
  type: [],
  untouchedFiltered: [],
  brands: [],
  filteredByBrand: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCTS_REQUESTED":
      return {
        ...state,
        loading: true,
        error: null,
        data: [],
      };
    case "PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        filteredData: action.payload,
        untouchedFiltered: action.payload,
      };
    case "PRODUCTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
        data: [],
      };
    case "PRODUCTS_FILTERED_REQUESTED":
      return {
        ...state,
        loading: true,
      };
    case "PRODUCTS_FILTERED_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "PRODUCTS_FILTERED":
      return {
        ...state,
        loading: false,
        filteredData: action.payload,
      };
    case "PRODUCTS_FILTERED_UNTOUCHED":
      return {
        ...state,
        untouchedFiltered: action.payload,
      };
    case "PRODUCTS_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
