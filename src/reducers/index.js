import loginReducer from "./login";
import registerReducer from "./register";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
});
