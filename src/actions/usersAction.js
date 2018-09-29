export const GET_USERS = "GET_USERS";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";

//Action creator for get initial users
export const getUsers = users => {
  return {
    type: GET_USERS,
    users
  };
};

//Action creator for add users answer for a question in the answer array of a user
export const addUserAnswer = (authedUser, qid, answer) => {
  return {
    type: ADD_USER_ANSWER,
    authedUser,
    qid,
    answer
  };
};

//Action creator for add question in a user's question array.
export function addUserQuestion(authedUser, qid) {
  return {
    type: ADD_USER_QUESTION,
    authedUser,
    qid
  };
}
