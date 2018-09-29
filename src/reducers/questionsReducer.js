import {
  GET_QUESTIONS,
  ADD_QUESTION,
  SAVE_QUESTION_ANSWER
} from "../actions/types";
// Reducer function for get inital questions,add a new question & save answer for the question.
export default function(state = {}, action) {
  switch (action.type) {
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question
      };
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };

      //Deep clone of state immutably
    case SAVE_QUESTION_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      };
    default:
      return state;
  }
}
