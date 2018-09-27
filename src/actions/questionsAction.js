import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from "./types";

export const addQuestion = question => {
  return {
    type: ADD_QUESTION,
    question
  };
};

export const receiveQuestions = questions => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

export const saveQuestionAnswer = (authedUser, qid, answer) => {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  };
};
