import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion
} from "../utils/_DATA";
import {
  receiveUsers,
  addUserAnswer,
  addUserQuestion
} from "../actions/usersAction";
import {
  receiveQuestions,
  saveQuestionAnswer,
  addQuestion
} from "../actions/questionsAction";

export function handleInitialData() {
  return dispatch => {
    return Promise.all([
      _getUsers(),
      _getQuestions()
    ]).then(([users, questions]) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

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

export const saveQuestion = info => {
  return _saveQuestion(info);
};

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
