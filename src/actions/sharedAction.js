import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion
} from "../utils/_DATA";
import {
  getUsers,
  addUserAnswer,
  addUserQuestion
} from "../actions/usersAction";
import {
  getQuestions,
  saveQuestionAnswer,
  addQuestion
} from "../actions/questionsAction";

//// Helper function to get the initial data from our backend API.
export function handleInitialData() {
  return dispatch => {
    return Promise.all([
      _getUsers(),
      _getQuestions()
    ]).then(([users, questions]) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
    });
  };
}


export const saveQuestion = info => {
  return _saveQuestion(info);
};

// Helper function to add a new question into the App
export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const questionInfo = {
      optionOneText,
      optionTwoText,
      author: authedUser
    };
    return saveQuestion(questionInfo).then(updatedQuestion => {
      dispatch(addQuestion(updatedQuestion));
      dispatch(addUserQuestion(authedUser, updatedQuestion.id));
    });
  };
}
// Helper function to save answer of a question & user's answer
export function handleSaveQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    }).then(() => {
      dispatch(saveQuestionAnswer(authedUser, qid, answer));
      dispatch(addUserAnswer(authedUser, qid, answer));
    });
  };
}
