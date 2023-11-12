import { combineReducers } from "redux";
import Auth from "./auth/reducers";
import Users from "./users/reducers";

export default combineReducers({
  Auth,
  Users,
});
