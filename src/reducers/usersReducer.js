import {
  RECEIVE_USERS,
  ADD_USER_ANSWER,
  ADD_USER_QUESTION
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
       //Deep clone of state immutably
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([action.qid])
        }
      };
       //Deep clone of state immutably
    case ADD_USER_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };

    default:
      return state;
  }
}
