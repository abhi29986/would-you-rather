import { LOG_IN_USER, LOG_OUT_USER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case LOG_IN_USER:
      return action.id;
    case LOG_OUT_USER:
      return null;
    default:
      return state;
  }
}
