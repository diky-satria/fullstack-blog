import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import authReducerError from "./authError/reducer";
import search from "./search/reducer";

const reducer = combineReducers({
  auth: authReducer,
  authError: authReducerError,
  search: search,
});

export default reducer;
