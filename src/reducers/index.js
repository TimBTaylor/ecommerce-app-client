import loginReducer from "./login";
import registerReducer from "./register";
import { combineReducers } from "redux";
import userInfoReducer from "./userInfo";
import productReducer from "./products";

export const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  userInfoReducer,
  productReducer,
});
