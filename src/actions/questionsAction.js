import { GET_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from "./types";

//Action creator for add a new question 
export const addQuestion = question => {
  return {
    type: ADD_QUESTION,
    question
  };
};
//Action creator for get initial question from our backend API
export const getQuestions = questions => {
  return {
    type: GET_QUESTIONS,
    questions
  };
};

//Action creator for  saving answer of a question 
export const saveQuestionAnswer = (authedUser, qid, answer) => {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  };
};
