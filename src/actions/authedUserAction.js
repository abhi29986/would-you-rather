import { LOG_IN_USER, LOG_OUT_USER } from "./types";

export const loginUser = id => {
  return {
    type: LOG_IN_USER,
    id
  };
};

export const logoutUser = () => {
  return {
    type: LOG_OUT_USER
  };
};
