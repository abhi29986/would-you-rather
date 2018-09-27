import { combineReducers } from "redux";
import authedUserReducer from "./authedUserReducer";
import usersReducer from "./usersReducer";
import questionsReducer from "./questionsReducer";

export default combineReducers({
  authedUser: authedUserReducer,
  users: usersReducer,
  questions: questionsReducer
});
