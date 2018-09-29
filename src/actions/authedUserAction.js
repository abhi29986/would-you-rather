import { LOG_IN_USER, LOG_OUT_USER } from "./types";

//Action creator for login user, setting the id for logged in user
export const loginUser = id => {
  return {
    type: LOG_IN_USER,
    id
  };
};
//Action creator for logout a user, setting the user id to null
export const logoutUser = () => {
  return {
    type: LOG_OUT_USER
  };
};
