import { combineReducers } from "redux";
import { loginUserReducer, registerUserReducer } from "./reducers/authReducers";
import cartReducer from "./reducers/cartReducers";

const rootReducer = combineReducers({
  loginUser: loginUserReducer,
  registerUser: registerUserReducer,
  cart: cartReducer,
});

export default rootReducer;
